import AlgoliaSearchBox from './algolia-search-box';
import MessageBox from './message-box';
import request from 'superagent';

class MessageForm extends React.Component {

    constructor(props) {
        super();
        this._touched = {};
        this.state = {
            email: '',
            message: ''
        };
        this.updateState = this.updateState.bind(this);
        this._submit = this._submit.bind(this);
    }


    updateState(field) {
        this._touched[field.name] = field.name;
        this.setState(() => {
            return {[field.name]: field.value};
        });
    }

    _submit(event) {
        event.preventDefault();
        if (this._isEmailValid() && this._isMessageFilled()) {
            this._sendRequest();
        }
    }

    _isEmailValid() {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailReg.test(this.state.email);
    }

    _isMessageFilled() {
        return this.state.message.trim().length > 0;
    }

    _sendRequest() {
        request
            .post(this.props.submitUrl)
            .send({
                email: this.state.email,
                body: this.state.message
            })
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                // redirect or something like that
            });
    }

    render() {
        const errorClass = ' has-error';
        let headerErrMess = '',
            bodyErrMess = '',
            bodyClass = 'panel-body',
            headerClass = 'panel-heading';

        if (this._touched['email'] && !this._isEmailValid()) {
            headerErrMess = <strong>Email is not valid. Example: example@gmail.com</strong>;
            headerClass += errorClass;
        }

        if (this._touched['message'] && !this._isMessageFilled()) {
            bodyErrMess = <p>Message is empty!</p>;
            bodyClass += errorClass;
        }

        return (
            <div className="container">
                <form className='panel panel-primary' onSubmit={this._submit}>
                    <div className={headerClass}>
                        <AlgoliaSearchBox
                            name="email"
                            appId="X4CZOFIPYI"
                            angKey="c9d74d1b249831a64803caffb37a4e40"
                            index="ideals-people-energy"
                            attrs={['name', 'email']}
                            id='user'
                            placeholder="Select recipient..."
                            onChange={this.updateState}
                            value={this.state.email}
                        />
                        {headerErrMess}
                    </div>
                    <div className={bodyClass}>
                        <MessageBox onChange={this.updateState}/>
                        {bodyErrMess}
                        <button type="submit"
                                className="btn btn-primary"
                                disabled={!this._isMessageFilled() || !this._isEmailValid()}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default MessageForm;