// Entire list of queuers
QueueList = React.createClass({
    // Get data functionality
    mixins: [ReactMeteorData],

    // Grab the data
    getMeteorData() {
        return {
            queuers: Queuers.find({
                seated: false,
                removed: false
            }, {sort: {date: 1}}).fetch(),
            currentUser: Meteor.user()
        };
    },

    // Render out all queuers based on each queuer in the DB
    renderQueuers() {
        return this.data.queuers.map((queuer) => {
            return <Queuer
                       key={queuer._id}
                       queuer={queuer}
                       queueName={queuer.queueName}
                   />;
        });
    },

    // Clear Queue
    clearQueue() {
        if (confirm('Are you sure want to clear the queue?')) {
            Meteor.call('queueClear', Meteor.userId(), this.props.name, (error, result) => {
                if (error) {
                    return toastr.error(error.message);
                }
            });
        }
    },

    // Route to submit
    submitRoute() {
        FlowRouter.go('/' + this.data.currentUser.username + '/' + this.props.name + '/submit');
    },

    // profile route
    profileRoute() {
        FlowRouter.go('/' + this.data.currentUser.username + '/profile');
    },

    // Render Function
    render() {
        return (
            <div className="queue-items">
                <div className="flex-container">
                    <div className="flex-item">
                        <h1>{this.props.name}</h1>
                    </div>
                    <div onClick={this.profileRoute} className="flex-item align-right">
                        <button className="btn btn-danger back-btn">
                            Back
                        </button>
                    </div>
                </div>
                <hr />
                {this.data.currentUser ?
                <div className="col-md-4 col-sm-4">
                    <button
                        onClick={this.submitRoute}
                        className="btn btn-primary btn-lg btn-block">
                        Add Person
                    </button>
                    <button
                        onClick={this.clearQueue}
                        className="btn btn-danger btn-lg btn-block">
                        Clear Queue
                    </button>
                </div>
                : ""
                }
                <div className="col-md-8 col-sm-8 scroll-col">
                    {this.renderQueuers()}
                    {this.data.queuers.length === 0 ?
                        <p>Empty Queue</p>
                    :
                        ''
                    }
                </div>
            </div>
        );
    }
});
