// Login component
AccountLogin = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            currentUserId: Meteor.userId()
        };
    },

    // Component is all loaded and ready to go
    componentDidMount() {
        let usernameInput = this.refs.usernameInput;

        usernameInput.focus();
    },

    // Submit the form to login
    submitLoginForm(e) {
        e.preventDefault();

        // get both the username and password fields
        let username = trimInput(this.refs.usernameInput.value),
            password = this.refs.passwordInput.value;

        // attempt a login with the credentials from above
        Meteor.loginWithPassword(username, password, function(error) {
            if (error) {
                toastr.error(error.message);
                return console.log('Login Error: ' + error);
            } else {
                console.log('Login successful');
            }

            let routeString = '/queue/' + Meteor.userId().toString();
            FlowRouter.go(routeString);
        });

        return false;
    },
    signupRoute() {
        FlowRouter.go('/signup');
    },
    resetRoute() {
        FlowRouter.go('/password-reset');
    },
    render() {
        return (
            <div className="account-login-container">
                <h1>Login</h1>
                <hr />
                <form autoComplete="off">
                    <div className="form-group">
                        <label>Username/Email</label>
                        <input
                            ref="usernameInput"
                            type="text"
                            className="form-control"
                            placeholder="Username or Email"
                            autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            ref="passwordInput"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete="off"/>
                    </div>
                    <div className="form-group">
                        <button
                            onClick={this.submitLoginForm}
                            className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    Forgot your password? <a onClick={this.resetRoute}>Reset Password</a>
                </div>
                <div className="text-center">
                    Dont have an account? <a onClick={this.signupRoute}>Sign up</a>
                </div>
            </div>
        );
    }
});
