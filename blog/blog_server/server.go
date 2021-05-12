package main

import (
	"context"
	"fmt"
	"grpc-go-course-udemy/blog/blogpb"
	"log"
	"net"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/status"
)

var collection *mongo.Collection

type server struct {
}

func (*server) CreateBlog(ctx context.Context, req *blogpb.CreateBlogRequest) (*blogpb.CreateBlogResponse, error) {
	fmt.Println("Create blog request")
	blog := req.GetBlog()

	data := blogItem{
		AuthorID: blog.GetAuthorId(),
		Title:    blog.GetTitle(),
		Content:  blog.GetContent(),
	}

	res, err := collection.InsertOne(ctx, data)
	if err != nil {
		return nil, status.Errorf(
			codes.Internal,
			fmt.Sprintf("Internal error: %v", err),
		)
	}
	oid, ok := res.InsertedID.(primitive.ObjectID)
	if !ok {
		return nil, status.Errorf(
			codes.Internal,
			"Cannot convert to OID",
		)
	}

	return &blogpb.CreateBlogResponse{
		Blog: &blogpb.Blog{
			Id:       oid.Hex(),
			AuthorId: blog.GetAuthorId(),
			Title:    blog.GetTitle(),
			Content:  blog.GetContent(),
		},
	}, nil

}

type blogItem struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	AuthorID string             `bson:"author_id"`
	Content  string             `bson:"content"`
	Title    string             `bson:"title"`
}

func main() {
	// if we crash the go code, we get the file name and line number
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	fmt.Println("Connecting to MongoDB")
	// connect to MongoDB
	// https://pkg.go.dev/go.mongodb.org/mongo-driver/mongo
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	// client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://foo:bar@localhost:27017"))
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
		return
	}
	defer client.Disconnect(context.TODO())

	collection = client.Database("mydb").Collection("blog")

	fmt.Println("Blog Server Started")
	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalf("Failed to listen : %v", err)
	}

	opts := []grpc.ServerOption{}
	certFile := "ssl/server.crt"
	keyFile := "ssl/server.pem"
	tls := false
	if tls {
		// https://grpc.io/docs/guides/auth/
		creds, sslErr := credentials.NewServerTLSFromFile(certFile, keyFile)
		if sslErr != nil {
			log.Fatalf("Failed loading certificates: %v", sslErr)
			return
		}
		opts = append(opts, grpc.Creds(creds))
	}

	s := grpc.NewServer(opts...)
	blogpb.RegisterBlogServiceServer(s, &server{})

	go func() {
		defer lis.Close()
		if err := s.Serve(lis); err != nil {
			log.Fatalf("Failed to serve : %v", err)
		}
	}()

	// Wait for Control C to exit
	ch := make(chan os.Signal, 1)

	// Block until a signal is received
	<-ch

	// Finally, we stop the server
	fmt.Println("Stopping the server")
	s.Stop()
	fmt.Println("End of Program")
}
