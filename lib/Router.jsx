/*FlowRouter.subscriptions = function() {
    this.register('myQueuers', Meteor.subscribe('queuers'));
};*/

// Defines the public routes
const exposed = FlowRouter.group({});

// Defines the private routes
const admin = FlowRouter.group({
    // Allows routes for authrized users only
    triggersEnter: [(context, redirect) => {
        if (Meteor.loggingIn() || Meteor.userId()) {
            route = FlowRouter.current();
        } else {
            toastr.error('Access Denied');
            FlowRouter.go('/login');
        }
    }],
    prefix: '/:username',
    subscriptions() {
        Meteor.subscribe('queuers', Meteor.userId());
    }
});

FlowRouter.notFound = {
    name: '404',
    action() {
        ReactLayout.render(App, {
            content: <NotFound />
        });
    }
};

//
// exposed Routes
//

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
admin.route('/queue', {
    name: 'Queue',
    action() {
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

admin.route('/edit/:queuerName/:queuerId', {
    name: 'Edit',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <QueuerEdit queuerId={params.queuerId} queuerName={params.queuerName} />
        });
    }
});
