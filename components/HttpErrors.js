/**
 * Created by mmarinov on 08-Nov-14.
 */

var util = require('util');

var HttpError = function (statusCode, message) {
    Error.call(this);
    this.statusCode = statusCode;
    this.message = message;
};
util.inherits(HttpError, Error);

var NotFound = function () {
    HttpError.call(this, 404, 'Not Found');
};
util.inherits(NotFound, HttpError);

var BadRequest = function () {
    HttpError.call(this, 400, 'Bad Request');
};
util.inherits(BadRequest, HttpError);

var NotImplemented = function () {
    HttpError.call(this, 501, 'Not Implemented');
};
util.inherits(NotImplemented, HttpError);

module.exports = {
    HttpError: HttpError,
    NotFound: new NotFound(),
    BadRequest: new BadRequest(),
    NotImplemented: new NotImplemented()
};