AccountProfile = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            user: Meteor.user(),
            userId: Meteor.userId(),
            seatedQueuers: Queuers.find({seated: true}).fetch(),
            removedQueuers: Queuers.find({removed: true}).fetch()
        };
    },

    getSeatedQueuers() {
        return this.data.seatedQueuers.map((seatedQueuer) => {
            return (
                <li key={seatedQueuer.name} className="list-group-item">
                    {seatedQueuer.name}
                    <button
                        id={seatedQueuer.name}
                        className="btn btn-danger btn-sm pull-right">
                        Undo
                    </button>
                </li>
            );
        });
    },

    getRemovedQueuers() {
        return this.data.removedQueuers.map((removedQueuer) => {
            return (
                <li key={removedQueuer.name} className="list-group-item">
                    {removedQueuer.name}
                    <button
                        id={removedQueuer.name}
                        className="btn btn-danger btn-sm pull-right">
                        Undo
                    </button>
                </li>
            );
        });
    },

    getQueues() {
        return this.data.user.profile.queues.map(queue => {
            let queuerCount = Queuers.find({
                queueName: queue.name,
                removed: false,
                seated: false
            }).count();

            console.log(queuerCount);

            return (
                <tr key={queue.name}>
                    <td>{queue.name}</td>
                    <td>{queuerCount}</td>
                    <td className="control-buttons">
                        <button
                            id={queue.name}
                            onClick={this.queueRoute}
                            className="btn btn-warning btn-sm">Edit
                        </button>
                    </td>
                </tr>
            );
        });
    },

    queueRoute(e) {
        let queueName = e.target.id;

        FlowRouter.go('/' + this.data.user.username + '/' + queueName + '/queue');
    },

    addToggle() {
        this.refs.queueNameInput.value = '';
        this.refs.queueNameInput.focus();
    },

    addQueue(e) {
        e.preventDefault();

        let userQueueInfo = {
            queueName: this.refs.queueNameInput.value.trim(),
            userId: this.data.userId
        }

        console.log(userQueueInfo)

        if (userQueueInfo.queueName) {
            Meteor.call('userQueueUpdate', userQueueInfo, error => {
                if (error) {
                    toastr.error(error.message);
                }
                toastr.success('Add new queue');
            });

            FlowRouter.go('/' + this.data.user.username + '/' + userQueueInfo.queueName + '/queue');
        } else {
            toastr.error('New queue name must not be empty');
        }
    },

    accountSettingsRoute() {
        FlowRouter.go('/' + this.data.user.username + '/profile/settings');
    },

    render() {
        let user = {
            username: Meteor.user().username,
            businessName: Meteor.user().profile.businessName ? Meteor.user().profile.businessName : 'None',
            logoUrl: Meteor.user().profile.logoUrl ? Meteor.user().profile.logoUrl : '/images/sample.jpg',
            location: Meteor.user().profile.location ? Meteor.user().profile.location : 'None'
        };

        return (
            <div className="profile">
                <div className="flex-container">
                    <div className="flex-item">
                        <h1>{user.username}</h1>
                    </div>
                    <div className="flex-item align-right">
                        <button onClick={this.accountSettingsRoute} className="btn btn-default back-btn">
                            Edit
                        </button>
                    </div>
                </div>
                <hr />
                <div className="logo-col col-md-4 col-sm-4">
                    <img src={user.logoUrl} className="img-rounded img-profile" />
                    <h3>{user.businessName}</h3>
                    <h5>{user.location}</h5>
                </div>
                <div className="outer-col col-md-8 col-sm-8">
                    <div className="col-md-12 col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Queues
                                <a
                                    onClick={this.addToggle}
                                    className="btn btn-default btn-sm pull-right"
                                    data-toggle="collapse"
                                    data-target="#collapse-add"
                                    aria-expanded="false"
                                    aria-controls="collapse-add"
                                    type="button">
                                    Add
                                </a>
                            </div>
                            <div id="collapse-add" className="collapse">
                                <div className="well no-radius">
                                    <form>
                                        <div className="input-group">
                                            <input
                                                ref="queueNameInput"
                                                className="form-control"
                                                type="text"
                                                placeholder="New Queue" />
                                            <span className="input-group-btn">
                                                <button
                                                    onClick={this.addQueue}
                                                    className="btn btn-success">
                                                    Add Queue
                                                </button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th># Waiting</th>
                                        <th>Controls</th>
                                    </tr>
                                    {this.getQueues()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Recently Seated</div>
                            <ul className="list-group">
                                {this.getSeatedQueuers()}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Recently Removed</div>
                            <ul className="list-group">
                                {this.getRemovedQueuers()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
