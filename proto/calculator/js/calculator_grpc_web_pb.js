/**
 * @fileoverview gRPC-Web generated client stub for calculator
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.calculator = require('./calculator_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.calculator.CalculatorServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.calculator.CalculatorServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.calculator.SumRequest,
 *   !proto.calculator.SumResponse>}
 */
const methodDescriptor_CalculatorService_Sum = new grpc.web.MethodDescriptor(
  '/calculator.CalculatorService/Sum',
  grpc.web.MethodType.UNARY,
  proto.calculator.SumRequest,
  proto.calculator.SumResponse,
  /**
   * @param {!proto.calculator.SumRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.SumResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.calculator.SumRequest,
 *   !proto.calculator.SumResponse>}
 */
const methodInfo_CalculatorService_Sum = new grpc.web.AbstractClientBase.MethodInfo(
  proto.calculator.SumResponse,
  /**
   * @param {!proto.calculator.SumRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.SumResponse.deserializeBinary
);


/**
 * @param {!proto.calculator.SumRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.calculator.SumResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.calculator.SumResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.calculator.CalculatorServiceClient.prototype.sum =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/calculator.CalculatorService/Sum',
      request,
      metadata || {},
      methodDescriptor_CalculatorService_Sum,
      callback);
};


/**
 * @param {!proto.calculator.SumRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.calculator.SumResponse>}
 *     Promise that resolves to the response
 */
proto.calculator.CalculatorServicePromiseClient.prototype.sum =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/calculator.CalculatorService/Sum',
      request,
      metadata || {},
      methodDescriptor_CalculatorService_Sum);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.calculator.PrimeNumberDecompositionRequest,
 *   !proto.calculator.PrimeNumberDecompositionResponse>}
 */
const methodDescriptor_CalculatorService_PrimeNumberDecomposition = new grpc.web.MethodDescriptor(
  '/calculator.CalculatorService/PrimeNumberDecomposition',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.calculator.PrimeNumberDecompositionRequest,
  proto.calculator.PrimeNumberDecompositionResponse,
  /**
   * @param {!proto.calculator.PrimeNumberDecompositionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.PrimeNumberDecompositionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.calculator.PrimeNumberDecompositionRequest,
 *   !proto.calculator.PrimeNumberDecompositionResponse>}
 */
const methodInfo_CalculatorService_PrimeNumberDecomposition = new grpc.web.AbstractClientBase.MethodInfo(
  proto.calculator.PrimeNumberDecompositionResponse,
  /**
   * @param {!proto.calculator.PrimeNumberDecompositionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.PrimeNumberDecompositionResponse.deserializeBinary
);


/**
 * @param {!proto.calculator.PrimeNumberDecompositionRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.calculator.PrimeNumberDecompositionResponse>}
 *     The XHR Node Readable Stream
 */
proto.calculator.CalculatorServiceClient.prototype.primeNumberDecomposition =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/calculator.CalculatorService/PrimeNumberDecomposition',
      request,
      metadata || {},
      methodDescriptor_CalculatorService_PrimeNumberDecomposition);
};


/**
 * @param {!proto.calculator.PrimeNumberDecompositionRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.calculator.PrimeNumberDecompositionResponse>}
 *     The XHR Node Readable Stream
 */
proto.calculator.CalculatorServicePromiseClient.prototype.primeNumberDecomposition =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/calculator.CalculatorService/PrimeNumberDecomposition',
      request,
      metadata || {},
      methodDescriptor_CalculatorService_PrimeNumberDecomposition);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.calculator.SquareRootRequest,
 *   !proto.calculator.SquareRootResponse>}
 */
const methodDescriptor_CalculatorService_SquareRoot = new grpc.web.MethodDescriptor(
  '/calculator.CalculatorService/SquareRoot',
  grpc.web.MethodType.UNARY,
  proto.calculator.SquareRootRequest,
  proto.calculator.SquareRootResponse,
  /**
   * @param {!proto.calculator.SquareRootRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.SquareRootResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.calculator.SquareRootRequest,
 *   !proto.calculator.SquareRootResponse>}
 */
const methodInfo_CalculatorService_SquareRoot = new grpc.web.AbstractClientBase.MethodInfo(
  proto.calculator.SquareRootResponse,
  /**
   * @param {!proto.calculator.SquareRootRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.calculator.SquareRootResponse.deserializeBinary
);


/**
 * @param {!proto.calculator.SquareRootRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.calculator.SquareRootResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.calculator.SquareRootResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.calculator.CalculatorServiceClient.prototype.squareRoot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/calculator.CalculatorService/SquareRoot',
      request,
      metadata || {},
      methodDescriptor_CalculatorService_SquareRoot,
      callback);
};


/**
 * @param {!proto.calculator.SquareRootRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.calculator.SquareRootResponse>}
 *     Promise that resolves to the response
 */
proto.calculator.CalculatorServicePromiseClient.prototype.squareRoot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/calculator.CalculatorService/SquareRoot',
      request,
      metadata || {},
      methodDescriptor_CalculatorService_SquareRoot);
};


module.exports = proto.calculator;

