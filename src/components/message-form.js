import AlgoliaSearchBox from './algolia-search-box';
import MessageBox from './message-box';
import request from 'superagent';

class MessageForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            message: ''
        };
        this.updateState = this.updateState.bind(this);
        this._submit = this._submit.bind(this);
    }


    updateState(field) {
        this.setState(() => {
            return {[field.name]: field.value};
        });
    }

    _submit(event){
        event.preventDefault();
        request
            .post(this.props.submitUrl)
            .send({
                email: this.state.email,
                body: this.state.message
            })
            .set('Content-Type', 'application/json')
            .end( (err, res) => {
                if(err) {
                    console.log(err)
                }
                /// redirect or something like that
            });
    }

    render() {
        return (
            <div className="container">
                <form className="panel panel-primary" onSubmit={this._submit}>
                    <div className="panel-heading">
                        <AlgoliaSearchBox
                            name="email"
                            appId="X4CZOFIPYI"
                            angKey="c9d74d1b249831a64803caffb37a4e40"
                            index="ideals-people-energy"
                            attrs={['name', 'email']}
                            id='user'
                            placeholder="Select recipient..."
                            onBlur={this.updateState}
                        />
                    </div>
                    <div className="panel-body">
                        <MessageBox onBlur={this.updateState}/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default MessageForm;
