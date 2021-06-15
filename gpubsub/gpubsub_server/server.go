package main

import (
	"context"
	"fmt"
	"practise-gRPC-go/gpubsub/gpubsubpb"
	"strings"
	"time"

	"log"
	"net"

	"github.com/moby/moby/pkg/pubsub"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

type Server struct {
	pub *pubsub.Publisher
}

func NewPubsubService() *Server {
	obj := new(Server)
	obj.pub = pubsub.NewPublisher(1000*time.Millisecond, 10)
	return obj
}

func (s *Server) Publish(ctx context.Context, req *gpubsubpb.PublishRequest) (*gpubsubpb.PublishResponse, error) {
	msg := req.GetPubsubmessage()
	s.pub.Publish(msg)

	return &gpubsubpb.PublishResponse{
		Result: true,
	}, nil
}

func (s *Server) Subscribe(req *gpubsubpb.SubscribeRequest, stream gpubsubpb.PubsubService_SubscribeServer) error {
	ch := s.pub.SubscribeTopic(func(v interface{}) bool {
		data := v.(*gpubsubpb.PubSubMessage)
		if strings.HasPrefix(data.GetTopic(), req.GetTopic()) {
			return true
		}
		return false
	})

	for v := range ch {
		if err := stream.Send(&gpubsubpb.SubscribeResponse{
			Payload: v.(*gpubsubpb.PubSubMessage).GetPayload(),
		}); err != nil {
			return err
		}
	}
	return nil
}

func main() {
	fmt.Println("Pubsub service")

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
	gpubsubpb.RegisterPubsubServiceServer(s, NewPubsubService())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve : %v", err)
	}
}
