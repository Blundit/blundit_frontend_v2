import React from 'react';
import ReactDOM from 'react-dom';
import './styles/scss/index.css';
import Blundit from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Blundit />, document.getElementById('root'));
registerServiceWorker();
