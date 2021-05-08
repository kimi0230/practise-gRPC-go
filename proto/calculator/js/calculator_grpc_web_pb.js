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


module.exports = proto.calculator;

