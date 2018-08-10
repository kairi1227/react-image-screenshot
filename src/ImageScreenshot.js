import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import './ImageScreenshot.css';
import invariant from 'invariant';
import {Stage, Layer, Image, Rect} from 'react-konva';
import ClearReact from './ClearRect';
import classNames from 'classnames';
import Tool from './Tool';

class ImageScreenshot extends PureComponent {

  static initialState = {
    init: true,
    model: false,
    clear: {x: 0, y: 0, width: 0, height: 0},
    toolSelected: '',
    tools: {rect: []}
  };

  constructor(props) {
    super(props);
    invariant(props.image, 'The parameter image is required, it is a Image src or Image base64, eg: require(url).');
    this.state = {
      image: null,
      ...ImageScreenshot.initialState
    };
  }

  componentDidMount() {
    const {image: src} = this.props;
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      this.setState({image: image});
    }
  }

  selectTool(tool) {
    let state = {toolSelected: tool};
    const {close, onOk} = this.props;
    const {clear} = this.state;
    switch (tool) {
      case 'close':
        state = {...state, ...ImageScreenshot.initialState};
        close();
        break;
      case 'ok':
        onOk(clear);
        break;
      default:
    }
    this.setState(state);
  }

  render() {
    const {width, height, x, y, toolClassName} = this.props;
    const {init, model, clear, toolSelected, tools} = this.state;
    return (
      <Fragment>
        <Stage
          width={width}
          height={height}
          onMouseup={() => {
            if (!model && !init) {
              let state = {model: true};
              if (!clear.width || !clear.height) {
                state.clear = {x, y, width, height};
              }
              this.setState(state);
            }
          }}
          onMousedown={e => {
            if (!model) {
              this.setState({init: false, clear: {...clear, x: e.evt.clientX, y: e.evt.clientY}});
            }
          }}
          onMousemove={e => {
            if (!model && !init) {
              this.setState({clear: {...clear, width: e.evt.clientX - clear.x, height: e.evt.clientY - clear.y}});
            }
          }}>
          <Layer>
            <Image image={this.state.image} x={x} y={y} width={width} height={height}/>
            {init && <Rect strokeWidth={8} stroke={'#00AEFF'} x={x} y={x} width={width} height={height}/>}
          </Layer>
          <Layer>
            {!init && <Rect fill={'#000'} opacity={0.7} sceneFunc={context => {
              context.rect(x, y, width, height);
              context.fill();
              context.clearRect(clear.x, clear.y, clear.width, clear.height);
            }}/>}
          </Layer>
          <Layer>
            {
              !init && (clear.width > 0 || clear.height > 0)
              &&
              <ClearReact
                tool={toolSelected}
                clear={clear}
                changeClear={e => this.setState({clear: {...clear, ...e}})}
                toolDraw={e => {
                  this.setState({tools: {rect: [e]}})
                }}/>
            }
            {
              tools.rect.length > 0 &&
              <Rect {...tools.rect[0]} strokeWidth={2}
                    stroke={'red'}/>
            }
          </Layer>
        </Stage>
        {
          !init && (clear.width > 0 || clear.height > 0)
          &&
          <div className={classNames('tool-bar', {[toolClassName]: !!toolClassName})}>
            <Tool selectTool={e => this.selectTool(e)} toolSelected={toolSelected}/>
          </div>
        }
      </Fragment>
    );
  }
}

ImageScreenshot.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  toolClassName: PropTypes.string,
  close: PropTypes.func,
  onOk: PropTypes.func
};

ImageScreenshot.defaultProps = {
  image: null,
  width: 1024,
  height: 768,
  x: 0,
  y: 0,
  toolClassName: '',
  close: () => {
  },
  onOk: () => {
  }
};


export default ImageScreenshot;
