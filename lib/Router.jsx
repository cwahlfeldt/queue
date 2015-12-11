/*FlowRouter.subscriptions = function() {
    this.register('myQueuers', Meteor.subscribe('queuers'));
};*/

// Defines the public routes
var exposed = FlowRouter.group({});

// Defines the private routes
var admin = FlowRouter.group({
    // Allows routes for authrized users only
    triggersEnter: [(context, redirect) => {
        if (Meteor.loggingIn() || Meteor.userId()) {
            route = FlowRouter.current();
        } else {
            toastr.error('Access Denied');
            FlowRouter.go('/login');
        }
    }]
});

//
// exposed Routes
//
exposed.notFound = {
    name: '404',
    action() {
        ReactLayout.render(App, {
            content: <NotFound />
        });
    }
};

exposed.route('/', {
    name: 'Home',
    action() {
        ReactLayout.render(App, {
            content: <Home />
        });
    }
});

exposed.route('/login', {
    name: 'Login',
    action() {
        ReactLayout.render(App, {
            content: <AccountLogin />
        });
    }
});

exposed.route('/signup', {
    name: 'Signup',
    action() {
        ReactLayout.render(App, {
            content: <AccountSignup />
        });
    }
});

exposed.route('/password-reset', {
    name: 'Password Reset',
    action() {
        ReactLayout.render(App, {
            content: <AccountReset />
        });
    }
});

exposed.route('/password-reset/:token', {
    name: 'Password Reset',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <AccountReset token={params.token}/>
        });
    }
});

//
// admin Routes
//
admin.route('/queue/:userId', {
    name: 'Queue',
    subscriptions(params, queryParams) {
        Meteor.subscribe('queuers', params.userId);
    },
    action(params, queryParams) {
        console.log(params.userId);

        ReactLayout.render(App, {
            content: <QueueList />
        });
    }
});

admin.route('/submit', {
    name: 'Submit',
    action() {
        ReactLayout.render(App, {
            content: <QueueSubmit />
        });
    }
});
