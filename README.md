# gRPC Golang Course

Practise gRPC base on [simplesteph/grpc-go-course][grpc-go-course].

# Content

- PubSub w/ moby/pkg/pubsub
- Greeting Service
- Calculator Service
- Unary, Server Streaming, Client Streaming, BiDi Streaming
- Error Handling, Deadlines, SSL Encryption
- Blog API CRUD w/ MongoDB
- metadata (header)

# Installation

### MAC
``` shell
# protobuf
brew install protobuf
go get -u google.golang.org/grpc
go get -u github.com/golang/protobuf/protoc-gen-go

# Use it to generate faster marshaling and unmarshaling go code for your protocol buffers.
go get -u github.com/gogo/protobuf/protoc-gen-gofast

# MongoDB Go Driver
go get -u go.mongodb.org/mongo-driver/mongo
go get -u gopkg.in/mgo.v2/bson

# docker pub/sub
go get -u github.com/moby/moby/pkg/pubsub
```

### [evans]
##### installation
Evans has been created to use easier than other existing gRPC clients.
``` shell
brew tap ktr0731/evans
brew install evans
```

##### usage
``` shell
# connect to gRPC server
evans -p 50051 -r

# commands
show package
show service
call Sum
```

### MongoDB
#### 1. Offical Install Package
##### download
https://www.mongodb.com/try/download/community

##### [installation][mongodb-osx-install]
mv file to /usr/local and change name
``` shell
cd /usr/local
mv ~/mongodb-macos-x86_64-4.4.6/ mongodb
```

add bin to path
``` shell
vi ~/.zshrc
# add PATH
export PATH=/usr/local/mongodb/bin:$PATH
source ~/.zshrc
```

create data, log folder
``` shell
# create data, log folder
sudo mkdir -p /usr/local/var/mongodb
sudo mkdir -p /usr/local/var/log/mongodb

# make sure folder permission
sudo chown kimiimac /usr/local/var/mongodb
sudo chown kimiimac /usr/local/var/log/mongodb
```

start MongoDB
``` shell
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```

#### 2. Brew Install
```
# install
brew tap mongodb/brew
sudo chown -R $(whoami) /usr/local/var/log
chmod u+w /usr/local/var/log
brew install mongodb-community

# brew start
brew services start mongodb-community

# start MongoDB
mongod --config /usr/local/etc/mongod.conf --fork
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

### blog
``` shell
make build_blog
```

### gpubsub
``` shell
make build_gpubsub
```

# SSL
### generate SSL Key
``` shell
cd ssl
./instructions.sh  
```

### code sample
* [gRPC Authentication][auth]
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

### blog
```shell
go run blog/blog_server/server.go
go run blog/blog_client/client.go
```

### gpubsub
```shell
go run gpubsub/gpubsub_server/server.go
# subscriber
go run gpubsub/gpubsub_client_sub/client.go
# publisher
go run gpubsub/gpubsub_client_pub/client.go
```

# Reference
* https://developers.google.com/protocol-buffers/docs/gotutorial
* https://github.com/simplesteph/grpc-go-course
* https://github.com/gogo/protobuf
* https://grpc.io/docs/guides/auth/
* https://github.com/ktr0731/evans
* https://github.com/mongodb/mongo-go-driver
* https://grpc.io/
* https://jbrandhorst.com/post/gogoproto/
* https://github.com/gogo/grpc-example
* https://jbrandhorst.com/post/gogoproto/
* https://www.itread01.com/content/1587524882.html

# TODO
 - [ ] [middleware](https://github.com/grpc-ecosystem/go-grpc-middleware)

<!-- https://www.markdownguide.org/basic-syntax/ -->
[gotutorial]: https://developers.google.com/protocol-buffers/docs/gotutorial
[grpc-go-course]: https://github.com/simplesteph/grpc-go-course
[protobuf]: https://github.com/gogo/protobuf
[auth]: https://grpc.io/docs/guides/auth/
[evans]: https://github.com/ktr0731/evans
[mongodb-osx-install]: https://www.runoob.com/mongodb/mongodb-osx-install.html
[MongoDB Go Driver]: https://github.com/mongodb/mongo-go-driver