QueuerEdit = React.createClass({
    // Get data functionality
    mixins: [ReactMeteorData],

    // Grab the data
    getMeteorData() {
        return {
            queuer: Queuers.find({_id: this.props.queuerId}).fetch()[0]
        };
    },

    componentDidMount() {
        //console.log(this.data.queuer.name);

        this.refs.nameInput.focus();
        this.refs.nameInput.select();
    },

    // Update the appropriate queuer
    editQueuer(e) {
        e.preventDefault();

        let queuer = {
            _id: this.props.queuerId,
            name: toTitleCase(trimInput(this.refs.nameInput.value)),
            partySize: this.refs.partySizeInput.value,
            phoneNumber: this.refs.phoneInput.value
        };

        Meteor.call('queuerUpdate', queuer, (error) => {
            if (error) {
                return toastr.error(error.message);
            }

            FlowRouter.go('/' + Meteor.user().username + '/queue');
            toastr.success('Edited ' + '\"' + queuer.name + '\"');
        });
    },

    queueRoute() {
        let routeString = '/' + Meteor.user().username + '/queue';
        FlowRouter.go(routeString);
    },

    // main render function
    render() {
        return (
            <div className="queue-edit">
                <div className="flex-container">
                    <div className="flex-item">
                        <h1>Edit "{this.props.queuerName}"</h1>
                    </div>
                    <div className="flex-item align-right">
                        <button onClick={this.queueRoute} className="btn btn-danger back-btn">
                            Back
                        </button>
                    </div>
                </div>
                <hr />
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            ref="nameInput"
                            placeholder="Name"
                            className="form-control"
                            defaultValue={this.data.queuer.name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Party Size</label>
                        <input
                            type="number"
                            ref="partySizeInput"
                            placeholder="Size of Party"
                            className="form-control"
                            defaultValue={this.data.queuer.partySize}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        {this.data.queuer.phoneNumber ?
                            <input
                                type="text"
                                ref="phoneInput"
                                className="form-control"
                                placeholder="Phone Number"
                                defaultValue={this.data.queuer.phoneNumber}
                            />
                        :
                            <input
                                type="text"
                                ref="phoneInput"
                                className="form-control"
                                placeholder="Phone Number"
                            />
                        }
                    </div>
                    <div className="form-group">
                        <button
                            onClick={this.editQueuer}
                            className="btn btn-warning">
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
});
