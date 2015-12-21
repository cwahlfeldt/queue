AccountSettings = React.createClass({
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

    // reset password route
    resetRoute() {
        FlowRouter.go('/password-reset');
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
                                    className="active btn btn-default">
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
                                    Account Settings
                                </div>
                                <div className="panel-body">
                                    <form className="profile-settings">
                                        <div className="form-group">
                                            <label>Change Username</label>
                                            <input
                                                ref="usernameInput"
                                                className="form-control"
                                                type="text"
                                                placeholder="New Username" />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                onClick={this.changeUsername}
                                                className="btn btn-success">
                                                Change Username
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <label>Change Password</label>
                                            <input
                                                ref="passwordInput"
                                                className="form-control"
                                                type="text"
                                                placeholder="Old Password" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                ref="confirmPasswordInput"
                                                className="form-control"
                                                type="text"
                                                placeholder="New Password" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                ref="confirmPasswordInput"
                                                className="form-control"
                                                type="text"
                                                placeholder="Confrim New Password" />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                onClick={this.updateProfile}
                                                className="btn btn-success">
                                                Update Password
                                            </button>
                                            <a onClick={this.resetRoute}> Forgot password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="panel panel-danger">
                                <div className="panel-heading">
                                    Delete Account
                                </div>
                                <div className="panel-body">
                                    <form className="profile-settings">
                                        <div className="form-group">
                                            <p>Beware! This is permanent. This cannot be undone.</p>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                onClick={this.deleteAccount}
                                                className="btn btn-danger">
                                                Delete Account
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

