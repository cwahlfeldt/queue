if (Meteor.server){
    Meteor.methods({
        // Update the public profile details
        updatePublicProfile(data) {
            if (data.userId) {
                Meteor.users.update({_id: data.userId}, {
                    $set: {
                        'profile.businessName': data.businessName,
                        'profile.location': data.location
                    },
                }, {multi: true}, error => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('Public profile updated success');
                });
            } else {
                console.log('No user id found to update users public profile');
            }
        },

        // Upload a logo and attach the url and id to the users profile for later use
        userLogoUpload(data) {
            if (data.userId) {
                Meteor.defer(() => {
                    Meteor._sleepForMs(1000);
                    Meteor.users.update({_id: data.userId}, {
                        $set: {
                            'profile.logoUrl': data.logoUrl,
                            'profile.logoId': data.logoId
                        },
                    }, {multi: true}, error => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('Public logo updated success');
                    });
                });
            } else {
                console.log('No user id found to update users public logo');
            }
        },

        // Change the username
        changeUsername(userInfo) {
            if (userInfo.userId) {
                Accounts.setUsername(userInfo.userId, userInfo.username, error => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('Username updated');
                });
            } else {
                console.log('No user id found to update username');
            }
        },

        // Delete user
        deleteUser(userId) {
            if (userId) {
                Meteor.defer(() => {
                    Meteor._sleepForMs(1000);
                    Meteor.users.remove({_id: userId}, error => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('User deleted');
                    });
                });
            } else {
                console.log('No userId for account removal');
            }
        },

        // Add an email to the account
        addEmail(emailInfo) {
            if (emailInfo.userId) {
                Accounts.addEmail(emailInfo.userId, emailInfo.email);
                console.log('Email added');
            } else {
                console.log('Must have a userId');
            }
        },

        // Remove email from account
        removeEmail(emailInfo) {
            if (emailInfo.userId) {
                Accounts.removeEmail(emailInfo.userId, emailInfo.email);
                console.log('Email removed');
            } else {
                console.log('Must enter userId');
            }
        },

        // Push new queue names into the users 'queues' array
        userQueueUpdate(userQueueInfo) {
            if (userQueueInfo.userId) {
                Meteor.users.update({_id: userQueueInfo.userId}, {
                    $push: {
                        'profile.queues': {name: userQueueInfo.queueName}
                    }
                }, error => {
                    if (error) {
                        console.log(error.message);
                    }
                    console.log('Pushed new queue name to queues array');
                });
            } else {
                console.log('No user Id to update the queues array');
            }
        }
    });
}
