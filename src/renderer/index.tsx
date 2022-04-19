import { render } from 'react-dom';
import App from './App';

// In prodduction, render() is invoked by snapshot-helper.ts
exports.render = () => render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
  exports.render();
}
