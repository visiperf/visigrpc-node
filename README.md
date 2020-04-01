# gRPC helpers, middlewares ... for Node.JS

Package `visigrpc` provide some functions to help you making a gRPC server. Errors logged on [Sentry](https://sentry.io), HTTP status to gRPC code, ... Everything is made to assist you :)

Table of contents
=================

  * [Install](#install)
  * [Usage](#usage)
      * [Status](#status)
        * [Error](#error)
        * [gRPC code from HTTP status](#grpc-code-from-http-status)
  * [References](#references)

## Install

Use `npm` to install this package.

```shell
npm install --save visigrpc
```

## Usage

### Status

#### Error

The `error(code, msg)` function is used to return a gRPC error and log it into [Sentry](https://sentry.io).

```javascript
const grpc = require('grpc');
const sentry = require('@sentry/node');
const status = require('visigrpc/status');

sentry.init({ ... });

...

// your gRPC server implementation ...

...

function sayHello(call, callback) {
  callback(status.error(grpc.status.UNIMPLEMENTED, 'implement me'));
}
```

##### IMPORTANT : Only `Unknown`, `Internal` and `DataLoss` errors will be reported in Sentry !

#### gRPC code from HTTP status

If you make an HTTP request, you can use the `grpcCodeFromHttpStatus(status)` func to convert HTTP status code in response to gRPC code.

```javascript
const status = require('visigrpc/status');

let code = status.grpcCodeFromHttpStatus(403); // http status -> 403 (Forbidden)

// code -> 7 (grpc.status.PERMISSION_DENIED)
```

## References

* Sentry : [github.com/getsentry/sentry-javascript](https://github.com/getsentry/sentry-javascript)
