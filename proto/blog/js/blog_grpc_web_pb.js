/**
 * @fileoverview gRPC-Web generated client stub for blog
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.blog = require('./blog_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.blog.BlogServiceClient =
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
proto.blog.BlogServicePromiseClient =
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
 *   !proto.blog.CreateBlogRequest,
 *   !proto.blog.CreateBlogResponse>}
 */
const methodDescriptor_BlogService_CreateBlog = new grpc.web.MethodDescriptor(
  '/blog.BlogService/CreateBlog',
  grpc.web.MethodType.UNARY,
  proto.blog.CreateBlogRequest,
  proto.blog.CreateBlogResponse,
  /**
   * @param {!proto.blog.CreateBlogRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.blog.CreateBlogResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.blog.CreateBlogRequest,
 *   !proto.blog.CreateBlogResponse>}
 */
const methodInfo_BlogService_CreateBlog = new grpc.web.AbstractClientBase.MethodInfo(
  proto.blog.CreateBlogResponse,
  /**
   * @param {!proto.blog.CreateBlogRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.blog.CreateBlogResponse.deserializeBinary
);


/**
 * @param {!proto.blog.CreateBlogRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.blog.CreateBlogResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.blog.CreateBlogResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.blog.BlogServiceClient.prototype.createBlog =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/blog.BlogService/CreateBlog',
      request,
      metadata || {},
      methodDescriptor_BlogService_CreateBlog,
      callback);
};


/**
 * @param {!proto.blog.CreateBlogRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.blog.CreateBlogResponse>}
 *     Promise that resolves to the response
 */
proto.blog.BlogServicePromiseClient.prototype.createBlog =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/blog.BlogService/CreateBlog',
      request,
      metadata || {},
      methodDescriptor_BlogService_CreateBlog);
};


module.exports = proto.blog;

