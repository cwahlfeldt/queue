EmailsSettings = React.createClass({
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

        let publicProfile = {
            userId: Meteor.userId(),
            businessName: this.refs.businessNameInput.value.trim(),
            location: this.refs.locationInput.value.trim()
        };

        Meteor.call('updatePublicProfile', publicProfile, (error) => {
            if (error) {
                return toastr.error(error.message);
            }

            toastr.success(this.data.user.username + '\'s public profile, updated');
        });
    },

    // returns all emails for this account
    getEmails() {
        return this.data.user.emails.map((email) => {
            return <input
                      key={email.address}
                      type="email"
                      className="form-control"
                      defaultValue={email.address} />;
        });
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
        let user = this.data.user;

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
                                    className="btn btn-default">
                                        Profile
                                    </button>
                                <button
                                    onClick={this.accountSettingsRoute}
                                    className="btn btn-default">
                                        Account Settings
                                    </button>
                                <button
                                    onClick={this.emailsSettingsRoute}
                                    className="active btn btn-default">
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
                                    Email Settings
                                </div>
                                <div className="panel-body">
                                    <form className="profile-settings">
                                        <div className="form-group">
                                            <label>Upload Logo</label>
                                            <input type="File" />
                                        </div>
                                        <div className="form-group">
                                            <label>Business Name</label>
                                            <input
                                                ref="businessNameInput"
                                                className="form-control"
                                                type="text"
                                                placeholder="Business Name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input
                                                ref="locationInput"
                                                className="form-control"
                                                type="text"
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

