// Signup component
AccountSignup = React.createClass({
    // Component is all loaded and ready to go
    componentDidMount() {
        let usernameInput = this.refs.usernameInput;

        usernameInput.focus();
    },

    // Submit form to create account
    submitSignupForm(e) {
        e.preventDefault();

        // get both username and password values
        let username = trimInput(this.refs.usernameInput.value),
            email = trimInput(this.refs.emailInput.value),
            password = this.refs.passwordInput.value,
            confirmPassword = this.refs.confirmPasswordInput.value;

        // confirmed password needs to have a value the same as password
        if (password !== confirmPassword) {
            this.refs.confirmPasswordInput.value = '';
            this.refs.confirmPasswordInput.focus();
            return toastr.error('Confirmed password doesnt match');
        }

        if (username === '') {
            this.refs.usernameInput.focus();
            return toastr.error('Username required');
        } else if (email === '') {
            this.refs.emailInput.focus();
            return toastr.error('Email required');
        }

        // Create the account based on the validated information gathered above
        Accounts.createUser({
            username: username,
            email: email,
            password: password,
            profile: {
                businessName: null,
                location: null,
                queues: []
            }
        }, error => {
            if (error) {
                toastr.error(error.message);
                console.log(error.message);
            } else {
                toastr.success('Account creation successful');
                console.log('Sign Up Successful');
            }

            let routeString = '/' + Meteor.user().username + '/profile';
            FlowRouter.go(routeString);
        });

        // prevents reloading the page
        return false;
    },
    render() {
        return (
            <div className="account-login-container">
                <form autoComplete="off">
                    <h1>Sign Up</h1>
                    <hr />
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            ref="usernameInput"
                            type="text"
                            className="form-control"
                            placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            ref="emailInput"
                            type="email"
                            className="form-control"
                            placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            ref="passwordInput"
                            type="password"
                            className="form-control"
                            placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            ref="confirmPasswordInput"
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password" />
                    </div>
                    <div className="form-group">
                        <button
                            onClick={this.submitSignupForm}
                            className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
});
