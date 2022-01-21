import { render } from 'react-dom';
import App from './App';

exports.render = () => render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  exports.render();
}
