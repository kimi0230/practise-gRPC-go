package main

import (
	"context"
	"fmt"
	"log"
	"practise-gRPC-go/gpubsub/gpubsubpb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
)

func main() {
	fmt.Println("Pubsub Client Publisher")

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
	header := metadata.New(map[string]string{"authorization": "token-123-456", "space": "", "org": "", "limit": "", "offset": ""})
	// this is the critical step that includes your headers
	ctx := metadata.NewOutgoingContext(context.Background(), header)

	c := gpubsubpb.NewPubsubServiceClient(cc)

	msg := &gpubsubpb.PubSubMessage{
		Topic:   "golang:",
		Payload: "Hi Golang",
	}

	pubResult, err := c.Publish(ctx, &gpubsubpb.PublishRequest{Pubsubmessage: msg})
	if err != nil {
		log.Fatalf("Unexpected error: %v", err)
	}
	fmt.Println(pubResult)
}
