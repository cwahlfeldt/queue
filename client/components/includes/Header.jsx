// Header Component
Header = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            currentUser: Meteor.user()
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
        if (confirm('Are you sure you want to logout?')) {
            Meteor.logout();
            FlowRouter.go('/');
        }
    },

    // Signup route
    signupRoute() {
        FlowRouter.go('/signup');
    },

    // Queue route
    queueRoute() {
        let routeString = '/' + this.data.currentUser.username.toString() + '/queue';
        FlowRouter.go(routeString);
    },

    // Profile route
    profileRoute() {
        let routeString = '/' + this.data.currentUser.username.toString() + '/profile/settings';
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
                                    Queue
                                </a>
                            </li>
                            <li className="dropdown">
                                <a
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    role="button" aria-haspopup="true"
                                    aria-expanded="false">
                                    {this.data.currentUser.username} <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a>
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={this.profileRoute}>
                                            Settings
                                        </a>
                                    </li>
                                </ul>
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
