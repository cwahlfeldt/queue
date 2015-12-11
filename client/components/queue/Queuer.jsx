// Single queuer
Queuer = React.createClass({
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body queuer-flex">
                    <h5 className="queuer-item">
                        {this.props.queuer.name}
                    </h5>
                    <div className="controls queuer-item">
                        <button className="btn btn-success btn-sm">
                            Seat
                        </button>
                        <button className="btn btn-warning btn-sm">
                            Edit
                        </button>
                        <button className="btn btn-info btn-sm">
                            Text
                        </button>
                        <button className="btn btn-danger btn-sm">
                            Delete
                        </button>
                    </div>
                    <h5 className="queuer-item party-size">
                        {this.props.queuer.partySize}
                    </h5>
                </div>
            </div>
        );
    }
});
