EmailsSettings = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    // returns all emails for this account
    getEmails() {
        return this.data.user.emails.map(email => {
            return (
                <li key={email.address} id={email.address} className="list-group-item">
                    {email.address}
                    <span
                        onClick={this.removeEmail}
                        className="glyphicon glyphicon-trash pull-right"
                        aria-hidden="true">
                    </span>
                </li>
            );
        });
    },

    // Add a new email
    addEmail(e) {
        e.preventDefault();

        let emailInfo = {
            email: trimInput(this.refs.emailInput.value),
            userId: Meteor.userId()
        };

        if (isEmail(emailInfo.email)) {
            Meteor.call('addEmail', emailInfo, error => {
                if (error) {
                    return toastr.error(error.message);
                }

                this.refs.emailInput.value = '';
                toastr.success(emailInfo.email + ' has been added');
            });
        } else {
            toastr.error('Must enter a valid email');
        }
    },

    // Remove an email
    removeEmail(e) {
        e.preventDefault();

        if (Meteor.user().emails.length > 1) {
            let emailInfo = {
                email: e.target.parentNode.id,
                userId: Meteor.userId()
            };

            if (confirm('Are you sure you want to remove this email?')) {
                Meteor.call('removeEmail', emailInfo, error => {
                    if (error) {
                        return toastr.error(error.message);
                    }

                    toastr.success(emailInfo.email + ' removed');
                });
            }
        } else {
            toastr.error('Must have one active email');
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
                                    <label>Emails</label>
                                    <ul className="list-group">
                                        {this.getEmails()}
                                    </ul>
                                    <form className="profile-settings">
                                        <div className="form-group">
                                            <label>Add Emails</label>
                                            <div className="input-group">
                                                <input
                                                    ref="emailInput"
                                                    type="text"
                                                    className="form-control" />
                                                <span className="input-group-btn">
                                                    <button
                                                        onClick={this.addEmail}
                                                        className="btn btn-success">
                                                        Add Email
                                                    </button>
                                                </span>
                                            </div>
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

