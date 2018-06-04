import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppController from './AppController';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppController />, document.getElementById('root'));
registerServiceWorker();
