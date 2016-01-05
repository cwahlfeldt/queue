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
    prefix: '/:username'
});

FlowRouter.subscriptions = () => {
    Meteor.subscribe('logos');
};

// Global 404 for all paths not recognized
FlowRouter.notFound = {
    name: '404',
    action() {
        ReactLayout.render(App, {
            content: <NotFound />
        });
    }
};

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

admin.route('/:queueName/queue', {
    name: 'Custom Queue',
    subscriptions(params, queryParams) {
        Meteor.subscribe('queuers', Meteor.userId(), params.queueName);
    },
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <QueueList name={params.queueName} />
        });
    }
});

admin.route('/:queueName/submit', {
    name: 'Submit',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <QueueSubmit queueName={params.queueName}/>
        });
    }
});

admin.route('/:queueName/edit/:queuerName/:queuerId', {
    name: 'Edit',
    subscriptions(params, queryParams) {
        Meteor.subscribe('queuers', Meteor.userId(), params.queueName);
    },
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <QueuerEdit
                        queuerId={params.queuerId}
                        queuerName={params.queuerName} />
        });
    }
});

admin.route('/profile', {
    name: 'Profile',
    subscriptions() {
        Meteor.subscribe('allQueuers', Meteor.userId());
    },
    action() {
        ReactLayout.render(App, {
            content: <AccountProfile />
        });
    }
});

admin.route('/profile/settings', {
    name: 'Profile Settings',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <ProfileSettings />
        });
    }
});

admin.route('/account/settings', {
    name: 'Account Settings',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <AccountSettings />
        });
    }
});

admin.route('/emails/settings', {
    name: 'Email Settings',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <EmailsSettings />
        });
    }
});

admin.route('/billing/settings', {
    name: 'Billing Settings',
    action(params, queryParams) {
        ReactLayout.render(App, {
            content: <BillingSettings />
        });
    }
});

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
            content: <AccountReset token={params.token} />
        });
    }
});
