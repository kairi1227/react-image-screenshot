import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import './ImageScreenshot.css';
import invariant from 'invariant';
// import ReactCanvas from 'react-canvas';

class ImageScreenshot extends PureComponent {
  constructor(props) {
    super(props);
    invariant(props.image, 'The parameter image is required, it is a Image Object, eg: new Image().');
  }

  componentDidMount() {
    const {image} = this.props;
    if(this.canvas) {
      const content = this.canvas.getContext('2d');
      image.onload = () => {
        content.drawImage(image, 0, 0);
      }
    }
  }

  render() {
    const {width, height} = this.props;
    return (
      <Fragment>
        {/*<ReactCanvas.Surface width={width} height={height}>*/}
          {/*/!*<ReactCanvas.Image src={require('./webwxgetmsgimg.jpg')}/>*!/*/}
        {/*</ReactCanvas.Surface>*/}
        <canvas width={width} height={height} ref={r => this.canvas = r}></canvas>
      </Fragment>
    );
  }
}

ImageScreenshot.propTypes = {
  image: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

ImageScreenshot.defaultProps = {
  image: null,
  width: 1024,
  height: 768
};


export default ImageScreenshot;
