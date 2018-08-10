import React from 'react';
import './font/iconfont.css';
import {TOOL_ICONS} from './Constant';
import classNames from 'classnames';

export default ({toolSelected, selectTool}) => {
  return TOOL_ICONS.map((tool, index) => {
    let divProps = {
      key: tool,
      className : classNames('tool-item', {'active': toolSelected === tool}),
      onClick: () => selectTool(tool)
    };
    switch (tool) {
      case '|':
        return <span key={index}>|</span>;
      case 'rect':
      case 'round':
      case 'arrow':
      case 'world':
      case 'back':
      case 'save':
        break;
      case 'close':
        break;
      case 'ok':
        break;
      default:
    }
    return <div {...divProps}><i className={`iconfont icon-${tool}`}/></div>
  })
}