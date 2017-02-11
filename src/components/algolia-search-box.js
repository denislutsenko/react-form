import {Select, AsyncCreatable} from 'react-select';
import algoliasearch from 'algoliasearch';

class AlgoliaSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this._angoliaIndex = algoliasearch(this.props.appId, this.props.angKey).initIndex(this.props.index);
        this.state = {
            input: ''
        };
        this._inputChange = this._inputChange.bind(this);
        this._getOptions = this._getOptions.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    _inputChange(newInput) {
        this.setState(() => {
            return {input: newInput}
        });
    }

    _getOptions(input, callback) {
        const attrs = this.props.attrs;
        const queryParams = {
            attributesToRetrieve: attrs
        };
        this._angoliaIndex.search(input, queryParams, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    options: data.hits.map((entity) => {
                        return {
                            value: entity[attrs[1]],
                            label: entity[attrs[0]]
                        }
                    })
                });
            }
        });
    }

    _catitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /* This code can be replaced if we use ref with AsyncCreatable.
    Otherwise blur event's target points to hidden element that has
    no name and value */
    _onBlur(event){
        this.props.onBlur(event.target.parentNode.parentNode.parentNode.previousSibling);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this._catitalize(this.props.id)}:</label>
                <AsyncCreatable
                    name={this.props.name}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    matchPos="start"
                    matchProp="label"
                    value={this.state.input}
                    loadOptions={this._getOptions}
                    onChange={this._inputChange}
                    onBlur={this._onBlur}
                />
            </div>
        );
    }
}

export default AlgoliaSearchBox;