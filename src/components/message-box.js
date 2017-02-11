class MessageBox extends React.Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    placeholder="Type your message here..."
                    onBlur={(event) => {
                        this.props.onBlur(event.target)
                    }}
                />
            </div>
        );
    }
}

export default MessageBox;