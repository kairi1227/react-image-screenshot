import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageScreenshot from './ImageScreenshot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ImageScreenshot />, document.getElementById('root'));
registerServiceWorker();
