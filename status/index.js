const grpc = require('grpc');
const sentry = require('@sentry/node');

const mHttpStatusGrpcCode = new Map([
    [200, grpc.status.OK],
    [408, grpc.status.CANCELLED],
    [400, grpc.status.INVALID_ARGUMENT],
    [504, grpc.status.DEADLINE_EXCEEDED],
    [404, grpc.status.NOT_FOUND],
    [409, grpc.status.ALREADY_EXISTS],
    [403, grpc.status.PERMISSION_DENIED],
    [429, grpc.status.RESOURCE_EXHAUSTED],
    [412, grpc.status.FAILED_PRECONDITION],
    [501, grpc.status.UNIMPLEMENTED],
    [500, grpc.status.INTERNAL],
    [503, grpc.status.UNAVAILABLE],
    [401, grpc.status.UNAUTHENTICATED],
]);

exports.error = (code, msg) => {
    if (code === grpc.status.UNKNOWN || code === grpc.status.INTERNAL || code === grpc.status.DATA_LOSS) {
        sentry.captureException(new Error(msg));
    }

    return { code: code, details: msg };
};

exports.grpcCodeFromHttpStatus = (status) => {
    if (!mHttpStatusGrpcCode.has(status)) {
        return grpc.status.UNKNOWN;
    }

    return mHttpStatusGrpcCode.get(status);
};
