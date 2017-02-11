import ReactDOM from 'react-dom';
import MessageForm from './components/message-form';

ReactDOM.render(<MessageForm submitUrl="http://example.org"/>, document.getElementById('form-root'));