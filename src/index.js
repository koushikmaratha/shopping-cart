import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShoppingManager from './ShoppingManager';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ShoppingManager />, document.getElementById('root'));
registerServiceWorker();
