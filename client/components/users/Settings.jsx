Settings = React.createClass({
    // Allow getMeteorData
    mixins: [ReactMeteorData],

    // Get the current user
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    // returns all emails for this account
    getEmails() {
        return this.data.user.emails.map((email) => {
            return <input
                      key={email.address}
                      type="email"
                      className="form-control"
                      defaultValue={email.address} />;
        });
    },

    // Render function
    render() {
        let user = this.data.user;

        return (
            <div className="profile">
                <h1>Public Profile</h1>
                <hr />
                {user ?
                    <div className="user-details">
                        <form className="profile-settings">
                            <div className="form-group">
                                <label>Upload Logo</label>
                                <input type="File" />
                            </div>
                            <div className="form-group">
                                <label>Business Owner</label>
                                <input className="form-control" type="text" placeholder="Owners Name" />
                            </div>
                            <div className="form-group">
                                <label>Business Name</label>
                                <input className="form-control" type="text" placeholder="Business Name" />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input className="form-control" type="text" placeholder="Location" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success">Update Profile</button>
                            </div>
                        </form>
                    </div>
                :
                    ''
                }
            </div>
        );
    }
});
