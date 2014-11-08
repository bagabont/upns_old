/**
 * Created by mmarinov on 08-Nov-14.
 */
var mpns = require('mpns'),
    apn = require('apn'),
    gcm = require('node-gcm'),
    Subscriber = require('../models/subscriber');

var UnifiedMessenger = function () {

};

UnifiedMessenger.prototype.send = function (notification) {
    var target = notification.target;
    if (target) {
        var services = target.services;
        var platforms = target.platforms;

        if (services) {
            for (var i = 0; i < services.length; i++) {

                Subscriber
                    .find({service: services[i]})
                    .where('platform').in(platforms)
                    .exec(function (err, subscribers) {
                        console.log(subscribers);
                    });
            }
        }
    }
};

module.exports = new UnifiedMessenger();
