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
    if (!notification.target) {
        throw new Error('Target not defined.')
    }
    var target = notification.target;
    var services = target.services;
    var platforms = target.platforms;
    var id = target.id;

    if (!services) {
        throw new Error('Services not defined.');
    }
    Subscriber
        .find({})
        .where('service').in(services)
        .where('platform').in(platforms)
        .exec(function (err, subscribers) {
            for (var i = 0; i < subscribers.length; i += 1) {
                var subscriber = subscribers[i];
                var token = subscriber.token;

                switch (subscriber.platform.toLowerCase()) {
                    case 'windows':
                        mpns.sendToast(token, 'Some text', 'Hi there!', function (err) {
                            if (err) throw err;
                        });
                        break;
                    case'ios':
                        console.log('iOS not supported');
                        break;
                    case 'android':
                        console.log('Android not supported');
                        break;
                }
            }
        });
};

module.exports = new UnifiedMessenger();
