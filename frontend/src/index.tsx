/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import App from './App';
import { Provider } from './store'

render(() => <Provider><App /></Provider>, document.getElementById('root') as HTMLElement);