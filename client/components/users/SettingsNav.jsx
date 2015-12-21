SettingsNav = React.createClass({
    componentDidMount() {
        if (this.refs.profile.id === this.props.settingsContext) {
            this.refs.profile.classList.add('active');
        } else {
            this.refs.profile.classList.remove('active');
        }
    },
    render() {
        return (
            <div className="btn-group-vertical btn-block nav-btns">
                <button id="profile" ref="profile" className="btn btn-default">Profile</button>
                <button id="account-settings" ref="accountSettings" className="btn btn-default">Account Settings</button>
                <button id="emails" ref="emails" className="btn btn-default">Emails</button>
                <button id="billing" ref="billing" className="btn btn-default">Billing</button>
            </div>
        );
    }
});
