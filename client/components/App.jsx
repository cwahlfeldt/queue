// Main layout for the application
App = React.createClass({
    // Get data functionality
    mixins: [ReactMeteorData],

    // Grab the data
    getMeteorData() {
        return {
            queuers: Queuers.find({}).fetch()
        };
    },

    // Render function
    render() {
        return (
            <div className="app-container">
                <Header />
                <div className="container">
                    {this.props.content}
                </div>
            </div>
        );
    }
});
