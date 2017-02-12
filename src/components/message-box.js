class MessageBox extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    _onChange(event){
        this.props.onChange(event.target);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    placeholder="Type your message here..."
                    onChange={this._onChange}
                />
            </div>
        );
    }
}

export default MessageBox;