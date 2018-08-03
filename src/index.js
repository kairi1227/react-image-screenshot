import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageScreenshot from './ImageScreenshot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ImageScreenshot image={require('./webwxgetmsgimg.jpg')}/>, document.getElementById('root'));
registerServiceWorker();
