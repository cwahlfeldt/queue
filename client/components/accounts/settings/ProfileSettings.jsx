ProfileSettings = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    updateProfile(e) {
        e.preventDefault();

        let file = this.refs.uploadInput.files[0];

        // Insert new file into the Logos GridFS store
        if (file) {
            Logos.insert(file, (error, fileObj) => {
                // Inserted new logo with ID fileObj._id, and kicked off the data upload using HTTP
                if (error) {
                    return console.log(error.message);
                }

                // Remove last image as to not crowd up the database
                Logos.remove(Meteor.user().profile.logoId);

                let data = {
                    userId: Meteor.userId(),
                    logoUrl: '/cfs/files/logos/' + fileObj._id,
                    logoId: fileObj._id
                };

                Meteor.call('userLogoUpload', data, (error) => {
                    if (error) {
                        return console.log(error.message);
                    }
                });

                console.log('Successfully uploaded file');
            });
        }

        // Get profile form data
        let publicProfile = {
            userId: Meteor.userId(),
            businessName: this.refs.businessNameInput.value.trim(),
            location: this.refs.locationInput.value.trim()
        };

        // Update profile information
        Meteor.call('updatePublicProfile', publicProfile, error => {
            if (error) {
                return toastr.error(error.message);
            }

            toastr.success(this.data.user.username + '\'s public profile, updated');
        });
    },

    // upload a buisness logo
    previewUpload(e) {
        let files = e.target.files;
        let reader = new FileReader();

        reader.onload = e => {
            this.refs.logo.src = e.target.result;
        };

        reader.readAsDataURL(files[0]);
    },

    // account settings route
    profileSettingsRoute() {
        let route = '/' + this.data.user.username + '/profile/settings';
        FlowRouter.go(route);
    },

    // account settings route
    accountSettingsRoute() {
        let route = '/' + this.data.user.username + '/account/settings';
        FlowRouter.go(route);
    },

    // account settings route
    emailsSettingsRoute() {
        let route = '/' + this.data.user.username + '/emails/settings';
        FlowRouter.go(route);
    },

    // account settings route
    billingSettingsRoute() {
        let route = '/' + this.data.user.username + '/billing/settings';
        FlowRouter.go(route);
    },

    // Render function
    render() {
        /*let user = this.data.user;
        let logo = this.data.user.profile.logoUrl ? this.data.user.profile.logoUrl : '/images/sample.jpg',
            businessName = this.data.user.profile.businessName ? this.data.user.profile.businessName : '',
            location = this.data.user.profile.location ? this.data.user.profile.location : '';
        */
        let user = Meteor.user();
        let logo = user.profile.logoUrl ? user.profile.logoUrl : '/images/sample.jpg',
            businessName = user.profile.businessName ? user.profile.businessName : '',
            location = user.profile.location ? user.profile.location : '';

        return (
            <div className="profile">
                {user ?
                    <div className="user-details">
                        <h1>Settings</h1>
                        <hr />
                        <div className="col-md-4 col-sm-4">
                            <div className="btn-group-vertical btn-block nav-btns">
                                <button
                                    onClick={this.profileSettingsRoute}
                                    className="active btn btn-default">
                                        Profile
                                </button>
                                <button
                                    onClick={this.accountSettingsRoute}
                                    className="btn btn-default">
                                        Account Settings
                                </button>
                                <button
                                    onClick={this.emailsSettingsRoute}
                                    className="btn btn-default">
                                        Emails
                                </button>
                                <button
                                    onClick={this.billingSettingsRoute}
                                    className="btn btn-default">
                                        Billing
                                </button>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Profile Settings
                                </div>
                                <div className="panel-body">
                                    <form className="profile-settings">
                                        <div className="form-group">
                                            <label>Buisness Logo</label>
                                            <br />
                                            <img
                                                ref="logo"
                                                src={logo}
                                                className="logo-preview img-rounded" />
                                            <label>Upload New Logo
                                            <input
                                                onChange={this.previewUpload}
                                                ref="uploadInput"
                                                type="file" />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>Business Name</label>
                                            <input
                                                ref="businessNameInput"
                                                className="form-control"
                                                type="text"
                                                defaultValue={businessName}
                                                placeholder="Business Name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input
                                                ref="locationInput"
                                                className="form-control"
                                                type="text"
                                                defaultValue={location}
                                                placeholder="Location" />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                onClick={this.updateProfile}
                                                className="btn btn-success">
                                                Update Profile
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    ''
                }
            </div>
        );
    }
});
