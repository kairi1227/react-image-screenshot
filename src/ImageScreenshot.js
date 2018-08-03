import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './ImageScreenshot.css';
import invariant from 'invariant';
import {Stage, Layer, Image, Rect} from 'react-konva';

class ImageScreenshot extends PureComponent {
  constructor(props) {
    super(props);
    invariant(props.image, 'The parameter image is required, it is a Image src or Image base64, eg: require(url).');
    this.state = {image: undefined, width: 100, height: 100, isDraw: false};
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
    const {width, height} = this.props;
    const {width: r_w, height: r_h, isDraw} = this.state;
    return (
      <Stage width={width} height={height} onMouseup={() => {
        this.setState({isDraw: false});
      }} onMousedown={() => {
        this.setState({isDraw: true});
      }}>
        <Layer onMousemove={e => {
          isDraw && this.setState({width: e.evt.clientX, height: e.evt.clientY});
        }}>
          <Image image={this.state.image} x={50} y={50} width={height} height={height}/>
          <Rect strokeWidth={5} stroke={'red'} x={200} y={22} width={r_w-200} height={r_h-22}/>
        </Layer>
      </Stage>
    );
  }
}

ImageScreenshot.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

ImageScreenshot.defaultProps = {
  image: null,
  width: 1024,
  height: 768
};


export default ImageScreenshot;
