const grpc = require('grpc');
const sentry = require('@sentry/node');

exports.error = (code, msg) => {
    if (code === grpc.status.UNKNOWN || code === grpc.status.INTERNAL || code === grpc.status.DATA_LOSS) {
        sentry.captureException(new Error(msg));
    }

    return { code: code, details: msg };
};

exports.grpcCodeFromHttpStatus = () => { };
