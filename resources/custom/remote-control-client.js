'use strict';

var pubnub = new PubNub({
    publishKey: 'pub-c-59089c7e-6675-454c-9fc4-32a1ecdfad51',
    subscribeKey: 'sub-c-2e12c108-13db-11e7-aca9-02ee2ddab7fe',
    ssl: true
});

pubnub.addListener({
    message: function(event) {
        var message = event.message;
        jQuery('#display').text(message.slide + '.' + message.part);
    }
});

pubnub.subscribe({
    channels: ['output']
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}

jQuery(document).ready(function() {
    jQuery('.btn').click(function (eventObject) {
        var targetId = jQuery(this).attr('id');
        buttonCommand(targetId);
    });
});
