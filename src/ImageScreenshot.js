import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './ImageScreenshot.css';
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
    const {width, height, x, y} = this.props;
    const {init, model, clear} = this.state;
    return (
      <Stage
        width={width}
        height={height}
        onMouseup={() => {
          if (!model && !init) {
            this.setState({model: true});
          }
        }}
        onMousedown={e => {
          if(!model) {
            this.setState({init: false, clear: {x: e.evt.clientX, y: e.evt.clientY}});
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
          {
            !init && (clear.width > 0 || clear.height > 0)
            && <ClearReact clear={clear} changeClear={e => this.setState({clear: {...clear, ...e}})}/>
          }
        </Layer>
      </Stage>
    );
  }
}

ImageScreenshot.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

ImageScreenshot.defaultProps = {
  image: null,
  width: 1024,
  height: 768,
  x: 0,
  y: 0
};


export default ImageScreenshot;
