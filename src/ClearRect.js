import React, {PureComponent} from 'react';
import {Rect} from 'react-konva';
import './ImageScreenshot.css';

export default class extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {move: false, point: {a_x: 0, a_y: 0}, rect: {x: 0, y: 0, width: 0, height: 0}, rectMove: false};
  }

  render() {
    const {clear, changeClear, tool, toolDraw} = this.props;
    const {move, point, rect, rectMove} = this.state;
    return (
      <Rect strokeWidth={4}
            stroke={'#00AEFF'}
            {...clear}
            className={'cursor-move'}
            onMousedown={e => {
              e.evt.stopPropagation();
              e.evt.preventDefault();
              const state = {
                move: tool !== 'rect',
                rectMove: !move && tool === 'rect',
                point: tool === 'rect' ? point : {a_x: e.evt.clientX - clear.x, a_y: e.evt.clientY - clear.y},
                rect: tool === 'rect' ? {...rect, x: e.evt.clientX, y: e.evt.clientY} : rect
              };
              this.setState(state);
            }}
            onMouseup={e => {
              e.evt.stopPropagation();
              e.evt.preventDefault();
              this.setState({move: false, rectMove: false});
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
              if(rectMove) {
                this.setState({rect: {...rect, width: (e.evt.clientX - rect.x), height: (e.evt.clientY - rect.y)}}, () => toolDraw(rect));
              }
            }}/>
    );
  }
}