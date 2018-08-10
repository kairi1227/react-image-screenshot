import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import './ImageScreenshot.css';
import './font/iconfont.css';
import invariant from 'invariant';
import {Stage, Layer, Image, Rect} from 'react-konva';
import ClearReact from './ClearRect';

class ImageScreenshot extends PureComponent {
  constructor(props) {
    super(props);
    invariant(props.image, 'The parameter image is required, it is a Image src or Image base64, eg: require(url).');
    this.state = {
      image: undefined,
      init: true,
      model: false,
      clear: {x: 0, y: 0, width: 0, height: 0},
      isDraw: false
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

  render() {
    const {width, height, x, y, toolClassName} = this.props;
    const {init, model, clear} = this.state;
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
              && <ClearReact clear={clear} changeClear={e => this.setState({clear: {...clear, ...e}})}/>
            }
          </Layer>
        </Stage>
        {
          !init && (clear.width > 0 || clear.height > 0)
          &&
          <div className={`tool-bar ${toolClassName}`}>
            <div className={'tool-item'}><i className={'iconfont icon-rect'}/></div>
            <div className={'tool-item'}><i className={'iconfont icon-round'}/></div>
            <div className={'tool-item'}><i className={'iconfont icon-arrow'}/></div>
            <div className={'tool-item'}><i className={'iconfont icon-world'}/></div>
            |
            <div className={'tool-item'}><i className={'iconfont icon-back'}/></div>
            <div className={'tool-item'}><i className={'iconfont icon-save'}/></div>
            |
            <div className={'tool-item'}><i className={'iconfont icon-close'}/></div>
            <div className={'tool-item'}><i className={'iconfont icon-ok'}/></div>
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
  toolClassName: PropTypes.string
};

ImageScreenshot.defaultProps = {
  image: null,
  width: 1024,
  height: 768,
  x: 0,
  y: 0,
  toolClassName: ''
};


export default ImageScreenshot;
