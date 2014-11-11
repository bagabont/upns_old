/**
 * Created by mmarinov on 08-Nov-14.
 */
var mpns = require('mpns'),
    Subscriber = require('../models/subscriber');

var Pusher = function () {

};

Pusher.prototype.send = function (notification) {
    if (!notification.target) {
        throw new Error('Target not defined.');
    }
    if (!notification.headers) {
        throw new Error('Headers not defined.');
    }
    if (!notification.payload) {
        throw new Error('Payload not defined.');
    }

    var target = notification.target;

    Subscriber.find({})
        .where('service').in(target.services)
        .where('platform').in(target.platforms)
        .exec(function (err, subscribers) {
            if (err) {
                throw err;
            }

            for (var i = 0; i < subscribers.length; i += 1) {
                var platform = subscribers[i].platform,
                    token = subscribers[i].token;

                switch (platform) {
                    case 'windows':
                        pushToWindows(token, notification);
                        break;
                    case 'ios':
                        console.log('Not implemented');
                        break;
                    case 'android':
                        console.log('Not implemented');
                        break;
                }
            }
        }
    );
};

function pushToWindows(token, notification) {
    var title = notification.headers.text.toString(),
        content = notification.headers.type == 'text' ? notification.payload.content : '',
        id = notification.id;

    var options = {text1: title, text2: content, param: '?nid=' + id};
    mpns.sendToast(token, options, function (err) {
        if (err) {
            throw err;
        }
    });
}

module.exports = new Pusher();
