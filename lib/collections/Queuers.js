// Create the Queuers collection to store data about each queuer
Queuers = new Mongo.Collection('queuers');

if (Meteor.server) {
    Meteor.methods({
        // insert a new queuer at the bottom of the list
        queuerInsert: function(queuerAttr) {
            let queuer = {
                name: queuerAttr.name,
                partySize: queuerAttr.partySize,
                phoneNumber: queuerAttr.phoneNumber,
                texted: false,
                user: Meteor.user(),
                userId: Meteor.userId(),
                date: new Date()
            };

            let queuerId = Queuers.insert(queuer);

            return {
                _id: queuerId
            };
        },
        // remove a single queuer
        queuerRemove: function(id) {
            if (id) {
                Queuers.remove(id);
            }
        },
        // reset the entire db of queuers
        queueClear: function() {
            Queuers.remove({});
        }
        /*messageQueuer: function(data) {
            var queuer = data.queuer;

            twilio = Twilio('AC93fc9800448a1bd35e4318f4425993cf', '774e9224cfe2a21c343b9a25e99bba3e');
            twilio.sendSms({
                to: '+1' + queuer.phoneNumber, // Any number Twilio can deliver to
                from: '+18444628076', // A number you bought from Twilio and can use for outbound communication
                body: data.message // body of the SMS message
            }, function(err, responseData) { //this function is executed when a response is received from Twilio
                if (!err) { // "err" is an error received during the request, if any
                    // "responseData" is a JavaScript object containing data received from Twilio.
                    // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                    // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                    console.log(responseData.from); // outputs "+14506667788"
                    console.log(responseData.body); // outputs "word to your mother."
                }
            });

            return {
                date: queuer.date
            };
        }*/
    });
}
