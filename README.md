# gRPC Golang Course

Practise gRPC From [simplesteph/grpc-go-course](https://github.com/simplesteph/grpc-go-course)

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

# Generate protobuf
### greet
``` shell
make build_greet
```

### calculator
``` shell
make build_calculator
```

# SSL
### generate SSL Key
``` shell
cd ssl
./instructions.sh  
```

### code sample
* https://grpc.io/docs/guides/auth/
#### 1. Base case - no encryption or authentication
##### Client:
```go
conn, _ := grpc.Dial("localhost:50051", grpc.WithInsecure())
// error handling omitted
client := pb.NewGreeterClient(conn)
// ...
```

##### Server:
``` go
s := grpc.NewServer()
lis, _ := net.Listen("tcp", "localhost:50051")
// error handling omitted
s.Serve(lis)
```

#### 2. With server authentication SSL/TLS
##### Client:
``` go
creds, _ := credentials.NewClientTLSFromFile(certFile, "")
conn, _ := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(creds))
// error handling omitted
client := pb.NewGreeterClient(conn)
// ...
```

##### Server:
``` go
creds, _ := credentials.NewServerTLSFromFile(certFile, keyFile)
s := grpc.NewServer(grpc.Creds(creds))
lis, _ := net.Listen("tcp", "localhost:50051")
// error handling omitted
s.Serve(lis)
```

#### 3. Authenticate with Google
``` go
pool, _ := x509.SystemCertPool()
// error handling omitted
creds := credentials.NewClientTLSFromCert(pool, "")
perRPC, _ := oauth.NewServiceAccountFromFile("service-account.json", scope)
conn, _ := grpc.Dial(
    "greeter.googleapis.com",
    grpc.WithTransportCredentials(creds),
    grpc.WithPerRPCCredentials(perRPC),
)
// error handling omitted
client := pb.NewGreeterClient(conn)
// ...
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
* https://grpc.io/docs/guides/auth/
