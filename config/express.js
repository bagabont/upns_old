/**
 * Created by mmarinov on 09-Nov-14.
 */
module.exports = function (app) {
    app.disable('x-powered-by');
    app.disable('etag');
};