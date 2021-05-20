/**
 * @fileoverview gRPC-Web generated client stub for gpubsub
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.gpubsub = require('./pubsub_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.gpubsub.PubsubServiceClient =
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
proto.gpubsub.PubsubServicePromiseClient =
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
 *   !proto.gpubsub.PublishRequest,
 *   !proto.gpubsub.PublishResponse>}
 */
const methodDescriptor_PubsubService_Publish = new grpc.web.MethodDescriptor(
  '/gpubsub.PubsubService/Publish',
  grpc.web.MethodType.UNARY,
  proto.gpubsub.PublishRequest,
  proto.gpubsub.PublishResponse,
  /**
   * @param {!proto.gpubsub.PublishRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.gpubsub.PublishResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.gpubsub.PublishRequest,
 *   !proto.gpubsub.PublishResponse>}
 */
const methodInfo_PubsubService_Publish = new grpc.web.AbstractClientBase.MethodInfo(
  proto.gpubsub.PublishResponse,
  /**
   * @param {!proto.gpubsub.PublishRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.gpubsub.PublishResponse.deserializeBinary
);


/**
 * @param {!proto.gpubsub.PublishRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.gpubsub.PublishResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.gpubsub.PublishResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.gpubsub.PubsubServiceClient.prototype.publish =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/gpubsub.PubsubService/Publish',
      request,
      metadata || {},
      methodDescriptor_PubsubService_Publish,
      callback);
};


/**
 * @param {!proto.gpubsub.PublishRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.gpubsub.PublishResponse>}
 *     Promise that resolves to the response
 */
proto.gpubsub.PubsubServicePromiseClient.prototype.publish =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/gpubsub.PubsubService/Publish',
      request,
      metadata || {},
      methodDescriptor_PubsubService_Publish);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.gpubsub.SubscribeRequest,
 *   !proto.gpubsub.SubscribeResponse>}
 */
const methodDescriptor_PubsubService_Subscribe = new grpc.web.MethodDescriptor(
  '/gpubsub.PubsubService/Subscribe',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.gpubsub.SubscribeRequest,
  proto.gpubsub.SubscribeResponse,
  /**
   * @param {!proto.gpubsub.SubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.gpubsub.SubscribeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.gpubsub.SubscribeRequest,
 *   !proto.gpubsub.SubscribeResponse>}
 */
const methodInfo_PubsubService_Subscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.gpubsub.SubscribeResponse,
  /**
   * @param {!proto.gpubsub.SubscribeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.gpubsub.SubscribeResponse.deserializeBinary
);


/**
 * @param {!proto.gpubsub.SubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.gpubsub.SubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.gpubsub.PubsubServiceClient.prototype.subscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/gpubsub.PubsubService/Subscribe',
      request,
      metadata || {},
      methodDescriptor_PubsubService_Subscribe);
};


/**
 * @param {!proto.gpubsub.SubscribeRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.gpubsub.SubscribeResponse>}
 *     The XHR Node Readable Stream
 */
proto.gpubsub.PubsubServicePromiseClient.prototype.subscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/gpubsub.PubsubService/Subscribe',
      request,
      metadata || {},
      methodDescriptor_PubsubService_Subscribe);
};


module.exports = proto.gpubsub;

