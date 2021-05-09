# Grpc Golang Course

From [simplesteph/grpc-go-course](https://github.com/simplesteph/grpc-go-course)

# Content

- Greeting Service
- Calculator Service
- Unary, Server Streaming, Client Streaming, BiDi Streaming
- Error Handling, Deadlines, SSL Encryption
- Blog API CRUD w/ MongoDB

# Installation

### MAC
``` shell
brew install protobuf
go get -u google.golang.org/grpc
go get -u github.com/golang/protobuf/protoc-gen-go
# Use it to generate faster marshaling and unmarshaling go code for your protocol buffers.
go get -u github.com/gogo/protobuf/protoc-gen-gofast
```

# Generate
### greet
``` shell
make build_greet
```

### calculator
``` shell
make build_calculator
```


# Demo
### greet
```shell
go run greet/greet_server/server.go
go run greet/greet_client/client.go
```

### calculator
```shell
go run calculator/calculator_server/server.go
go run calculator/calculator_client/client.go
```

# Reference
* https://developers.google.com/protocol-buffers/docs/gotutorial
* https://github.com/simplesteph/grpc-go-course
* https://github.com/gogo/protobuf
