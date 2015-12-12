// Create the Queuers collection to store data about each queuer
Queuers = new Mongo.Collection('queuers');

if (Meteor.server) {
    Meteor.methods({
        // insert a new queuer at the bottom of the list
        queuerInsert(queuerAttr) {
            let queuer = {
                name: queuerAttr.name,
                partySize: queuerAttr.partySize,
                phoneNumber: queuerAttr.phoneNumber,
                texted: false,
                seated: false,
                removed: false,
                user: Meteor.user(),
                userId: Meteor.userId(),
                date: new Date()
            };

            let queuerId = Queuers.insert(queuer);

            return {
                _id: queuerId
            };
        },

        //Queuer update
        queuerUpdate(updateAttr) {
            if (updateAttr) {
                Queuers.update(updateAttr._id, {
                    $set: {
                        name: updateAttr.name,
                        partySize: updateAttr.partySize,
                        phoneNumber: updateAttr.phoneNumber
                    },
                }, {multi: true}, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }
                });
            } else {
                console.log('No attributes added');
            }
        },

        // Update queuer with seated: true
        seatQueuer(id) {
            if (id) {
                Queuers.update(id, {
                    $set: {seated: true}
                }, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }

                    console.log('Queuer updated');
                });

                // set the expiration for a queuer
                Meteor.call('removeQueuerExpire', id, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }
                });
            }
        },

        // remove a single queuer
        queuerRemove(id) {
            if (id) {
                Queuers.update(id, {
                    $set: {removed: true}
                }, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }

                    console.log('Queuer updated');
                });

                // set the expiration for a queuer
                Meteor.call('removeQueuerExpire', id, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }
                });
            }
        },

        // Removes queuer after expiration
        removeQueuerExpire(id) {
            if (id) {
                Meteor.defer(() => {
                    // dont do next action until 24 hours
                    Meteor._sleepForMs(8.64e+7);

                    // remove queuer
                    Queuers.remove(id, (error) => {
                        if (error) {
                            return console.log(error.message);
                        }

                        console.log('Queuer removed');
                    });
                });
            } else {
                console.log('No ID');
            }
        },

        // reset the entire db of queuers
        queueClear(userId) {
            if (userId) {
                Queuers.remove({userId: userId}, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }

                    console.log('Queue cleared');
                });
            } else {
                console.log('No queuerId');
            }
        }
        /*messageQueuer: (data) => {
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
