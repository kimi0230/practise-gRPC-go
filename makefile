all: build

build: build_greet

build_greet: gen.proto.greet.go gen.proto.greet.js
build_calculator: gen.proto.calculator.go gen.proto.calculator.js

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

clean:
	# rm -rf $(CURDIR)/proto/greet/go/*
	rm -rf $(CURDIR)/proto/greet/js/*
	rm -rf $(CURDIR)/proto/calculator/js/*

.PHONY: clean build all