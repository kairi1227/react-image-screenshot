import React from 'react';
import ReactDOM from 'react-dom';
import ImageScreenshot from './ImageScreenshot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageScreenshot />, div);
  ReactDOM.unmountComponentAtNode(div);
});
