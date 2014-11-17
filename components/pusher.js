var mpns = require('mpns'),
    Subscriber = require('../models/subscriber');

var Pusher = function () {

};
/**
 * Sends an event to all subscribers listed as target.
 * @param event {Event} Event to be pushed.
 */
Pusher.prototype.send = function (event) {
    if (!event.target) {
        throw new Error('Target not defined.');
    }
    if (!event.headers) {
        throw new Error('Headers not defined.');
    }
    if (!event.payload) {
        throw new Error('Payload not defined.');
    }

    var target = event.target;

    Subscriber.find({})
        .where('service').in(target.services)
        .where('platform').in(target.platforms)
        .exec(function (err, subscribers) {
            if (err) {
                throw err;
            }
            var subscriber;
            for (var i = 0; i < subscribers.length; i += 1) {
                subscriber = subscribers[i];

                switch (subscriber.platform) {
                    case 'windows':
                        pushToWindows(subscriber.token, event);
                        break;
                    case 'ios':
                        console.log('Not implemented');
                        break;
                    case 'android':
                        console.log('Not implemented');
                        break;
                }
            }
        });
};

function pushToWindows(token, event) {
    var title = event.headers.text.toString(),
        content = event.headers.type == 'text' ? event.payload.content : '',
        id = event.id;

    var options = {text1: title, text2: content, param: '?nid=' + id};
    mpns.sendToast(token, options, function (err) {
        if (err) {
            throw err;
        }
    });
}

module.exports = new Pusher();
