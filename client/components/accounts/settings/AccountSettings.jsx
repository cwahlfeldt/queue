AccountSettings = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    changeUsername(e) {
        e.preventDefault();

        let userInfo = {
            username: trimInput(this.refs.usernameInput.value),
            userId: Meteor.userId()
        };

        Meteor.call('changeUsername', userInfo, error => {
            if (error) {
                this.refs.usernameInput.value = Meteor.user().username;
                this.refs.usernameInput.focus();
                this.refs.usernameInput.focus();
                return toastr.error(error.message);
            }

            toastr.success('Updated Username to: ' + userInfo.username);
        });
    },

    changePassword(e) {
        e.preventDefault();

        let oldPassword = trimInput(this.refs.oldPasswordInput.value),
            newPassword = trimInput(this.refs.newPasswordInput.value),
            confirmPassword = trimInput(this.refs.confirmPasswordInput.value);

        if (oldPassword === '') {
            this.refs.oldPasswordInput.select();
            this.refs.oldPasswordInput.focus();
            return toastr.error('Must enter old password');
        }

        if (newPassword === '') {
            this.refs.newPasswordInput.selct();
            this.refs.newPasswordInput.focus();
            return toastr.error('Must enter new password');
        }

        if (newPassword !== confirmPassword) {
            this.refs.confirmPasswordInput.select();
            this.refs.confirmPasswordInput.focus();
            return toastr.error('Confirm password must match');
        }

        Accounts.changePassword(oldPassword, newPassword, error => {
            if (error) {
                return toastr.error(error.message);
            }

            this.refs.oldPasswordInput.value = '';
            this.refs.newPasswordInput.value = '';
            this.refs.confirmPasswordInput.value = '';

            toastr.success('Successfully updated password');
        });
    },

    deleteAccount(e) {
        e.preventDefault();

        if (confirm('Are you sure you want to delete this account?')) {
            FlowRouter.go('/');
            Meteor.call('deleteUser', Meteor.userId(), error => {
                if (error) {
                    return toastr.error(error.message);
                }

                if (Meteor.user().profile.logoId) {
                    Logos.remove(Meteor.user().profile.logoId);
                }

                toastr.warning('Account deleted');
            });
        }
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
        let user = Meteor.user();

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
                                            <label>Username</label>
                                            <div className="input-group">
                                                <input
                                                    ref="usernameInput"
                                                    className="form-control"
                                                    type="text"
                                                    defaultValue={user.username}
                                                    placeholder="New Username" />
                                                <span className="input-group-btn">
                                                    <button
                                                        onClick={this.changeUsername}
                                                        className="btn btn-success">
                                                        Change Username
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Change Password</label>
                                            <input
                                                ref="oldPasswordInput"
                                                className="form-control"
                                                type="password"
                                                placeholder="Old Password" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                ref="newPasswordInput"
                                                className="form-control"
                                                type="password"
                                                placeholder="New Password" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                ref="confirmPasswordInput"
                                                className="form-control"
                                                type="password"
                                                placeholder="Confirm New Password" />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                onClick={this.changePassword}
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
                                            <p>Beware! This is permanent.
                                             This cannot be undone.
                                             Your billing will be cancelled.</p>
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
