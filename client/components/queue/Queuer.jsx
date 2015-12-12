// Single queuer
Queuer = React.createClass({
    getInitialState() {
        return {
            selected: false
        };
    },

    // Toggle the controls on
    toggleControlsOn() {
        this.setState({selected: true});
    },

    // toggle the controls off
    toggleControlsOff() {
        this.setState({selected: false});
    },

    // Update the collection with a 'seated' boolean value when the customer has been seated
    seatQueuer() {
        if (confirm('Are you sure you want to seat the customer?')) {
            Meteor.call('seatQueuer', this.props.queuer._id, (error) => {
                if (error) {
                    return toastr.error(error.message);
                }

                toastr.success(this.props.queuer.name + ' has been seated');
            });
        }
    },

    // Delete the queuer from the collection
    deleteQueuer() {
        if (confirm('Are you sure you want to delete this?')) {
            Meteor.call('queuerRemove', this.props.queuer._id, (error) => {
                if (error) {
                    return toastr.error(error.message);
                }

                toastr.success(this.props.queuer.name + ' removed from the queue');
            });
        }
    },

    // Edit route
    editRoute() {
        FlowRouter.go('/' + Meteor.user().username + '/edit/' + this.props.queuer.name + '/' + this.props.queuer._id);
    },

    // Render function
    render() {
        let toggleHidden = !this.state.selected ? 'hidden' : '';
        let toggleGlow = !this.state.selected ? 'panel-body queuer-flex' : 'glowing-border panel-body queuer-flex';

        return (
            <div
                ref="panel"
                id="panel"
                onMouseEnter={this.toggleControlsOn}
                onMouseLeave={this.toggleControlsOff}
                className="panel panel-default">
                <div className={toggleGlow}>
                    <h5 className="queuer-item">
                        {this.props.queuer.name}
                    </h5>
                    <div className="controls queuer-item">
                        <div className={toggleHidden}>
                            <button
                                onClick={this.seatQueuer}
                                className="btn btn-success btn-sm">
                                Seat
                            </button>
                            <button
                                onClick={this.editRoute}
                                className="btn btn-warning btn-sm">
                                Edit
                            </button>
                            <button className="btn btn-info btn-sm">
                                Text
                            </button>
                            <button
                                onClick={this.deleteQueuer}
                                className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                    <h5 className="queuer-item party-size">
                        {this.props.queuer.partySize}
                    </h5>
                </div>
            </div>
        );
    }
});
