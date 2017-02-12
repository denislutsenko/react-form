import Select from 'react-select';
import algoliasearch from 'algoliasearch';

class AlgoliaSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            isLoading: false
        };
        this._valueChange = this._valueChange.bind(this);
        this._getOptions = this._getOptions.bind(this);
    }

    componentDidMount(){
        this._angoliaIndex = algoliasearch(this.props.appId, this.props.angKey).initIndex(this.props.index);
        this._getOptions('');
    }

    _valueChange(newInput) {
        this.props.onChange( {
            name: this.props.name,
            value: newInput ? newInput.value : ''
        } );
    }

    _getOptions(input){
        this.setState(() => {
            return {isLoading: true}
        });
        const attrs = this.props.attrs;
        const queryParams = {
            attributesToRetrieve: attrs
        };
        const setState = this.setState.bind(this);
        this._angoliaIndex.search(input, queryParams, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const opts = data.hits.map((entity) => {
                    return {
                        value: entity[attrs[1]],
                        label: entity[attrs[0]]
                    }
                });
                setState(() => {
                    return {options: opts, isLoading: false};
                });
            }

        });
    }

    _catitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this._catitalize(this.props.id)}:</label>
                <Select.Creatable
                    {...this.props}
                    matchPos="start"
                    matchProp="label"
                    options={this.state.options}
                    onChange={this._valueChange}
                    isLoading={this.state.isLoading}
                    onInputChange={this._getOptions}
                />
            </div>
        );
    }
}

export default AlgoliaSearchBox;