// Submit queuer componenet
QueueSubmit = React.createClass({
    // Get data functionality
    mixins: [ReactMeteorData],

    // Grab the data
    getMeteorData() {
        return {
            //currentUsername: Meteor.user().username
        };
    },

    // Component is all loaded and ready to go
    componentDidMount() {
        let nameInput = this.refs.nameInput;

        nameInput.focus();
    },

    // Submit a queuer into the list
    submitQueuer(e) {
        e.preventDefault();

        // Grab queuer data via string references
        let queuer = {
            name: toTitleCase(this.refs.nameInput.value),
            partySize: this.refs.partySizeInput.value,
            phoneNumber: this.refs.phoneInput.value
        };

        // Queuer info must be available
        if (queuer.name === '' || queuer.partySize === '') {
            return toastr.error('Name and party size required!');
        }

        // Phone number must be max if ten characters
        if ((queuer.phoneNumber.toString().length < 10)
            && queuer.phoneNumber !== '') {
            return toastr.error('Please include area code');
        }

        // Call the queuerInsert method to insert a queuer to the list
        Meteor.call('queuerInsert', queuer, (error, result) => {
            if (error) {
                console.log(error);
                return toastr.error(error.message);
            }

            let routeString = '/' + Meteor.user().username + '/queue';
            FlowRouter.go(routeString);
        });
    },

    queueRoute() {
        let routeString = '/' + Meteor.user().username + '/queue';
        FlowRouter.go(routeString);
    },

    // Render Function
    render() {
        return (
            <div className="queue-submit">
                <div className="flex-container">
                    <div className="flex-item">
                        <h1>Submit</h1>
                    </div>
                    <div onClick={this.queueRoute} className="flex-item align-right">
                        <button className="btn btn-danger back-btn">
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
                        <button onClick={this.submitQueuer} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
});
