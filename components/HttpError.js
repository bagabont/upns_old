function HttpError(statusCode, message) {
    this.constructor.prototype = Error.prototype;
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
}

HttpError.prototype.toString = function () {
    return this.name + '(' + this.statusCode + ')' + ': ' + this.message;
};

module.exports = HttpError;
