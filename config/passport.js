/**
 * Created by mmarinov on 11-Nov-14.
 */
var User = require('../models/user'),
    BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function (app, passport) {
    passport.use(new BasicStrategy(function (username, password, done) {
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!user.checkPassword(password)) {
                    return done(null, false);
                }
                return done(null, {id: user.id, username: user.username});
            });
        }
    ));

    app.use(passport.initialize());
};

