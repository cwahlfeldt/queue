if (Meteor.server){
    Meteor.methods({
        updatePublicProfile(data) {
            if (data.userId) {
                Meteor.users.update({_id: data.userId}, {
                    $set: {
                        'profile.buisnessName': data.businessName,
                        'profile.location': data.location
                    },
                }, {multi: true}, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }

                    console.log('Public profile updated success');
                });
            } else {
                console.log('No user id found to update users public profile');
            }
        }
    });
}
