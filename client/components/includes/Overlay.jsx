Overlay = React.createClass({
    getInitialState() {
        return {
            showModal: this.props.showModal
        };
    },

    close() {
        this.setState({showModal: false});
    },
    //Render Function
    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
            </Modal>
        );
    }
});
