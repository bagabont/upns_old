var util = require('util');

function HttpError(status, message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.statusCode = status;
    this.message = message;
}

HttpError.prototype.toString = function () {
    return this.message + 'Status:' + this.statusCode;
}

util.inherits(HttpError, Error);

module.exports = HttpError;