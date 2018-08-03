import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageScreenshot from './ImageScreenshot';
import registerServiceWorker from './registerServiceWorker';
const image = new Image();
image.src = require('./webwxgetmsgimg.jpg');

ReactDOM.render(<ImageScreenshot image={image}/>, document.getElementById('root'));
registerServiceWorker();
