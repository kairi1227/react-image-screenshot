import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageScreenshot from './ImageScreenshot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ImageScreenshot image={require('./webwxgetmsgimg.jpg')} toolClassName={'tool-test'} onOk={e => console.log(e)}/>, document.getElementById('root'));
registerServiceWorker();
