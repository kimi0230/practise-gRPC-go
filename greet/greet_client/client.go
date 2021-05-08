package main

import (
	"fmt"

	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Hello I'm client")

	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
}
