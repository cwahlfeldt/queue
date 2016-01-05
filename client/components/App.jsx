// Main layout for the application
App = React.createClass({
    // Render function
    render() {
        return (
            <div className="app-container">
                <Header />
                <div className="container">
                    {this.props.content}
                </div>
                <Overlay showModal={this.props.showModal} body={this.props.modalContent} />
            </div>
        );
    }
});
