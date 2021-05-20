all: build

build: build_greet build_calculator build_blog

build_greet: gen.proto.greet.go gen.proto.greet.js
build_calculator: gen.proto.calculator.go gen.proto.calculator.js
build_blog: gen.proto.blog.go gen.proto.blog.js
build_gpubsub: gen.proto.gpubsub.go gen.proto.gpubsub.js

# greet/greetpb
gen.proto.greet.go:
	protoc -I=$(CURDIR)/greet/greetpb $(CURDIR)/greet/greetpb/*.proto \
	--gofast_out=plugins=grpc,paths=source_relative,\
	google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:greet/greetpb/.
	# google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:proto/greet/go/.

gen.proto.greet.js:
	protoc -I=$(CURDIR)/greet/greetpb $(CURDIR)/greet/greetpb/*.proto \
		--js_out=import_style=commonjs:$(CURDIR)/proto/greet/js/. \
		--grpc-web_out=import_style=commonjs,mode=grpcweb:$(CURDIR)/proto/greet/js/. 

# calculator/calculatorpb
gen.proto.calculator.go:
	protoc -I=$(CURDIR)/calculator/calculatorpb $(CURDIR)/calculator/calculatorpb/*.proto \
	--gofast_out=plugins=grpc,paths=source_relative,\
	google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:calculator/calculatorpb/.
	# google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:proto/calculator/go/.

gen.proto.calculator.js:
	protoc -I=$(CURDIR)/calculator/calculatorpb $(CURDIR)/calculator/calculatorpb/*.proto \
		--js_out=import_style=commonjs:$(CURDIR)/proto/calculator/js/. \
		--grpc-web_out=import_style=commonjs,mode=grpcweb:$(CURDIR)/proto/calculator/js/. 

# blog/blogpb
gen.proto.blog.go:
	protoc -I=$(CURDIR)/blog/blogpb $(CURDIR)/blog/blogpb/*.proto \
	--gofast_out=plugins=grpc,paths=source_relative,\
	google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:blog/blogpb/.
	# google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:proto/blog/go/.

gen.proto.blog.js:
	protoc -I=$(CURDIR)/blog/blogpb $(CURDIR)/blog/blogpb/*.proto \
		--js_out=import_style=commonjs:$(CURDIR)/proto/blog/js/. \
		--grpc-web_out=import_style=commonjs,mode=grpcweb:$(CURDIR)/proto/blog/js/. 

# gpubsub/gpubsubpb
gen.proto.gpubsub.go:
	protoc -I=$(CURDIR)/gpubsub/gpubsubpb $(CURDIR)/gpubsub/gpubsubpb/*.proto \
	--gofast_out=plugins=grpc,paths=source_relative,\
	google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:gpubsub/gpubsubpb/.
	# google/protobuf/timestamp.proto=github.com/gogo/protobuf/types:proto/gpubsub/go/.

gen.proto.gpubsub.js:
	protoc -I=$(CURDIR)/gpubsub/gpubsubpb $(CURDIR)/gpubsub/gpubsubpb/*.proto \
		--js_out=import_style=commonjs:$(CURDIR)/proto/gpubsub/js/. \
		--grpc-web_out=import_style=commonjs,mode=grpcweb:$(CURDIR)/proto/gpubsub/js/. 

clean:
	# rm -rf $(CURDIR)/proto/greet/go/*
	rm -rf $(CURDIR)/proto/greet/js/*
	rm -rf $(CURDIR)/proto/calculator/js/*
	rm -rf $(CURDIR)/proto/blog/js/*

.PHONY: clean build all