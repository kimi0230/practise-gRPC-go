#!/bin/bash

# protoc greet/greetpb/greet.proto --go_out=plugins=grpc:.
# protoc calculator/calculatorpb/calculator.proto --go_out=plugins=grpc:.
# protoc blog/blogpb/blog.proto --go_out=plugins=grpc:.

# Kimi : --go_out: protoc-gen-go: plugins are not supported; use 'protoc --go-grpc_out=...' to generate gRPC
protoc greet/greetpb/greet.proto  --go_out=. 