Meteor.publish('queuers', (userId, queueName) => {
    return Queuers.find({
        userId: userId,
        queueName: queueName
    });
});

Meteor.publish('allQueuers', (userId) => {
    return Queuers.find({userId});
});

Meteor.publish('logos', () => {
    return Logos.find();
});
