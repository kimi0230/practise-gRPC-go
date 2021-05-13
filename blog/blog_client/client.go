package main

import (
	"context"
	"fmt"
	"grpc-go-course-udemy/blog/blogpb"
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	fmt.Println("Blog Client")

	tls := false
	opts := grpc.WithInsecure()
	if tls {
		// https://grpc.io/docs/guides/auth/
		//fix: error while calling Greet RPC: rpc error: code = Unavailable desc = connection closed
		certFile := "ssl/ca.crt" // Certificate Authority Trust certificate
		creds, sslErr := credentials.NewClientTLSFromFile(certFile, "")
		if sslErr != nil {
			log.Fatalf("Error while loading CA trust certificate: %v", sslErr)
			return
		}
		opts = grpc.WithTransportCredentials(creds)
	}

	cc, err := grpc.Dial("localhost:50051", opts)
	if err != nil {
		log.Fatalf("could not connect: %v", err)
	}
	defer cc.Close()

	c := blogpb.NewBlogServiceClient(cc)

	// create Blog
	fmt.Println("Creating the blog")
	blog := &blogpb.Blog{
		AuthorId: "Kimi",
		Title:    "My First Blog",
		Content:  "Content of the first blog",
	}
	createBlogRes, err := c.CreateBlog(context.Background(), &blogpb.CreateBlogRequest{Blog: blog})
	if err != nil {
		log.Fatalf("Unexpected error: %v", err)
	}
	fmt.Printf("Blog has been created: %v", createBlogRes)

}
