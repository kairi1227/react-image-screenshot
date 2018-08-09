import React, {PureComponent} from 'react';
import {Rect} from 'react-konva';
import './ImageScreenshot.css';

export default class extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {move: false, point: {a_x: 0, a_y: 0}};
  }

  render() {
    const {clear, changeClear} = this.props;
    const {move, point} = this.state;
    return (
      <Rect strokeWidth={4}
            stroke={'#00AEFF'}
            {...clear}
            className={'cursor-move'}
            onMousedown={e => {
              e.evt.stopPropagation();
              e.evt.preventDefault();
              this.setState({move: true, point: {a_x: e.evt.clientX - clear.x, a_y: e.evt.clientY - clear.y}});
            }}
            onMouseup={e => {
              e.evt.stopPropagation();
              e.evt.preventDefault();
              this.setState({move: false});
            }}
            onMousemove={e => {
              e.evt.stopPropagation();
              e.evt.preventDefault();
              if (move) {
                changeClear({
                  x: (e.evt.clientX - point.a_x),
                  y: (e.evt.clientY - point.a_y)
                });
              }
            }}/>
    );
  }
}