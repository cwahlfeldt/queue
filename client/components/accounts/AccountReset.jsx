// use the token when generated to go to the reset page with the token in the url
Accounts.onResetPasswordLink((token) => {
    FlowRouter.go('/password-reset/' + token);
});

// Reset password for account
AccountReset = React.createClass({
    getInitialState() {
        return {
            passResetToken: this.props.token
        };
    },

    // Send the reset email
    resetEmail(e) {
        e.preventDefault();

        let email = trimInput(this.refs.emailInput.value);

        if (email !== '' && isEmail(email)) {
            Accounts.forgotPassword({email: email}, (error) => {
                if (error) {
                    return toastr.error(error.message);
                }

                toastr.success('Email has been sent');
            });
        } else {
            return toastr.error('Please use valid email address');
        }
    },

    // Reset the password in app
    resetPassword(e) {
        e.preventDefault();

        let password = this.refs.newPassInput.value,
            confirmPassword = this.refs.confirmPassInput.value;

        if (password === '') {
            this.refs.newPassInput.focus();
            return toastr.error('Please enter a new password');
        } else if (confirmPassword === '') {
            this.refs.confirmPassInput.focus();
            return toastr.error('Please confirm new password');
        }

        if (confirmPassword !== password) {
            this.refs.confirmPassInput.value = '';
            this.refs.confirmPassInput.focus();
            return toastr.error('Confirm password doesnt match');
        }

        Accounts.resetPassword(this.props.token, password, (error) => {
            if (error) {
                return toastr.error();
            }

            toastr.success('Your password has been reset');
            FlowRouter.go('/login');
        });
    },
    render() {
        return (
            <div className="account-reset">
                <h1>Password Reset</h1>
                <hr />
                <form>
                    {!this.props.token ?
                        <div className="password-reset">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    ref="emailInput"
                                    className="form-control"
                                    type="email"
                                    placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <button
                                    onClick={this.resetEmail}
                                    className="btn btn-primary">
                                    Send Email
                               </button>
                            </div>
                        </div>
                    :
                        <div className="password-reset">
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    ref="newPassInput"
                                    className="form-control"
                                    type="password"
                                    placeholder="New Password" />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    ref="confirmPassInput"
                                    className="form-control"
                                    type="password"
                                    placeholder="Confirm New Password" />
                            </div>
                            <div className="form-group">
                                <button
                                    onClick={this.resetPassword}
                                    className="btn btn-primary">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        );
    }
});
