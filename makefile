all: build

build: build_greet

build_greet: gen.proto.greet.go gen.proto.greet.js

gen.proto.greet.go:
	protoc -I=$(CURDIR)/greet/greetpb $(CURDIR)/greet/greetpb/*.proto \
	--gofast_out=plugins=grpc,paths=source_relative,\
	google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:greet/greetpb/.
	# google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:proto/greet/go/.

gen.proto.greet.js:
	protoc -I=$(CURDIR)/greet/greetpb $(CURDIR)/greet/greetpb/*.proto \
		--js_out=import_style=commonjs:$(CURDIR)/proto/greet/js/. \
		--grpc-web_out=import_style=commonjs,mode=grpcweb:$(CURDIR)/proto/greet/js/. 

clean:
	# rm -rf $(CURDIR)/proto/greet/go/*
	rm -rf $(CURDIR)/proto/greet/js/*

.PHONY: clean build all