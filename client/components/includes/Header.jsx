// Header Component
Header = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            currentUser: Meteor.user(),
            currentUserId: Meteor.userId()
        };
    },

    // Home route
    homeRoute() {
        FlowRouter.go('/');
    },

    // Login route
    loginRoute() {
        FlowRouter.go('/login');
    },

    // Logout route
    accountLogout() {
        Meteor.logout();
        FlowRouter.go('/');
    },

    // Signup route
    signupRoute() {
        FlowRouter.go('/signup');
    },

    // Queue route
    queueRoute() {
        let routeString = '/queue/' + this.data.currentUserId.toString();

        FlowRouter.go(routeString);
    },

    // Render function
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#navbar-collapse"
                        aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" onClick={this.homeRoute}>Queue</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        { this.data.currentUser ?
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a onClick={this.queueRoute}>
                                    {this.data.currentUser.username}
                                </a>
                            </li>
                            <li>
                                <a onClick={this.accountLogout}>Logout</a>
                            </li>
                        </ul>
                        :
                        <ul className="nav navbar-nav navbar-right">
                            <li><a onClick={this.signupRoute}>Sign Up</a></li>
                            <li><a onClick={this.loginRoute}>Login</a></li>
                        </ul>
                        }
                    </div>
                </div>
            </nav>
        );
    }
});
