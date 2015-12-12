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

    // Did component load
    componentDidMount() {
        //console.log($('.scroll-col').height());
    },

    // Render out all queuers based on each queuer in the DB
    renderQueuers() {
        return this.data.queuers.map((queuer) => {
            return <Queuer key={queuer._id} queuer={queuer} />;
        });
    },

    // Clear Queue
    clearQueue() {
        if (confirm('Are you sure want to clear the queue?')) {
            Meteor.call('queueClear', Meteor.userId(), (error, result) => {
                if (error) {
                    return toastr.error(error.message);
                }
            });
        }
    },

    // Route to submit
    submitRoute() {
        FlowRouter.go('/' + this.data.currentUser.username.toString() + '/submit');
    },

    // Render Function
    render() {
        return (
            <div className="queue-items">
                <h1>Your Queue</h1>
                <hr />
                { this.data.currentUser ?
                <div className="col-md-4 col-sm-4">
                    <button onClick={this.submitRoute} className="btn btn-primary btn-lg btn-block">
                        Add Person
                    </button>
                    <button onClick={this.clearQueue} className="btn btn-danger btn-lg btn-block">
                        Clear Queue
                    </button>
                </div>
                : ""
                }
                <div className="col-md-8 col-sm-8 scroll-col">
                    {this.renderQueuers()}
                    { this.data.queuers.length === 0 ?
                        <p>Empty Queue</p>
                    :
                        ''
                    }
                </div>
            </div>
        );
    }
});
