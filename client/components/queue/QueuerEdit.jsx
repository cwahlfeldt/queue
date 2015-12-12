QueuerEdit = React.createClass({
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
            toastr.success('Updated');
        });
    },

    // main render function
    render() {
        return (
            <div className="queue-edit">
                <h1>Edit "{this.props.queuerName}"</h1>
                <hr />
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            ref="nameInput"
                            placeholder="Name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Party Size</label>
                        <input
                            type="number"
                            ref="partySizeInput"
                            placeholder="Size of Party"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            ref="phoneInput"
                            className="form-control"
                            placeholder="Phone Number"
                        />
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
