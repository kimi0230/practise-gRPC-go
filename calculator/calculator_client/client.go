package main

import (
	"fmt"
	"grpc-go-course-udemy/calculator/calculatorpb"
	"io"
	"time"

	"log"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Hello I'm client")

	cc, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("could not connect: %v", err)
	}
	defer cc.Close()

	c := calculatorpb.NewCalculatorServiceClient(cc)
	// fmt.Printf("Created client: %f", c)

	// doUnary(c)
	// doServerStreaming(c)
	// doClientStreaming(c)
	doBiDiStreaming(c)
}

func doUnary(c calculatorpb.CalculatorServiceClient) {
	req := &calculatorpb.SumRequest{
		FirstNumber:  5,
		SecondNumber: 40,
	}
	res, err := c.Sum(context.Background(), req)
	if err != nil {
		log.Fatalf("error while calling Sum RPC: %v", err)
	}
	log.Printf("Response from Sum: %v", res.SumResult)
}

func doServerStreaming(c calculatorpb.CalculatorServiceClient) {
	fmt.Println("Starting to do a PrimeDecomposition Server Streaming RPC...")

	req := &calculatorpb.PrimeNumberDecompositionRequest{
		Number: 12390392840,
	}
	resStream, err := c.PrimeNumberDecomposition(context.Background(), req)
	if err != nil {
		log.Fatalf("error while calling PrimeDecomposition RPC: %v", err)
	}

	for {
		res, err := resStream.Recv()
		if err == io.EOF {
			// we've reached the end of the stream
			break
		}
		if err != nil {
			log.Fatalf("error while reading stream: %v", err)
		}
		log.Println(res.GetPrimeFactor())
	}

}

func doClientStreaming(c calculatorpb.CalculatorServiceClient) {
	fmt.Println("Starting to do a ComputeAverage Client Streaming RPC...")

	stream, err := c.ComputeAverage(context.Background())
	if err != nil {
		log.Fatalf("error while calling LongGreet: %v", err)
	}

	numbers := []int32{3, 5, 9, 54, 23}
	// we iterate over our slice and send each message individually
	for _, number := range numbers {
		fmt.Printf("Sending number: %v\n", number)
		req := calculatorpb.ComputeAverageRequest{
			Number: number,
		}
		stream.Send(&req)
	}

	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("Error while receiving response: %v", err)
	}
	fmt.Printf("The Average is: %v\n", res.GetAverage())
}

func doBiDiStreaming(c calculatorpb.CalculatorServiceClient) {
	fmt.Println("Starting to do a FindMaximum BiDi Streaming RPC...")

	stream, err := c.FindMaximum(context.Background())
	if err != nil {
		log.Fatalf("Error while opening stream and calling FindMaximum: %v", err)
	}

	waitc := make(chan struct{})
	// send go routine
	go func() {
		defer stream.CloseSend()
		numbers := []int32{4, 7, 2, 19, 4, 6, 32}
		for _, number := range numbers {
			fmt.Printf("Sending number: %v\n", number)
			stream.Send(&calculatorpb.FindMaximumRequest{
				Number: number,
			})
			time.Sleep(1000 * time.Millisecond)
		}
	}()
	// receive go routine
	go func() {
		defer close(waitc)
		for {
			res, err := stream.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Fatalf("Problem while reading server stream: %v", err)
				break
			}
			maximum := res.GetMaximum()
			fmt.Printf("Received a new maximum of...: %v\n", maximum)
		}
	}()
	<-waitc
	fmt.Println("FindMaximum Done")
}
