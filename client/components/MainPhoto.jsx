/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainPhotoPortalWrapper from './MainPhotoPortalWrapper';
import MainPhotoPortal from './MainPhotoPortal';
import ZoomPortalWrapper from './ZoomPortalWrapper';
import ZoomPortal from './ZoomPortal';
import MainPhotoHover from './MainPhotoHover';

const MainPhotoWrapper = styled.div`
  grid-area: main;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 400px;
  width: 400px;
`;

class MainPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.mainPhotoRef = React.createRef();
    this.state = {
      portalOn: false,
      zoomOn: false,
      hoverOn: false,
      zoomBackgroundPosition: '0% 0%',
    };
    this.handlePortalCreate = this.handlePortalCreate.bind(this);
    this.handlePortalClose = this.handlePortalClose.bind(this);
    this.handleMainPhotoMouseMove = this.handleMainPhotoMouseMove.bind(this);
    this.handleMainPhotoMouseEnter = this.handleMainPhotoMouseEnter.bind(this);
    this.handleMainPhotoMouseLeave = this.handleMainPhotoMouseLeave.bind(this);
  }

  handlePortalCreate() {
    this.setState({
      portalOn: true,
    });
  }

  handlePortalClose() {
    this.setState({
      portalOn: false,
    });
  }

  handleMainPhotoMouseEnter() {
    this.setState({
      zoomOn: true,
      hoverOn: true,
    });
  }

  handleMainPhotoMouseLeave() {
    this.setState({
      zoomOn: false,
      hoverOn: false,
    });
  }

  handleMainPhotoMouseMove(e) {
    e.preventDefault();
    // get main photo screen coordinates and width/height
    const {
      left, top, width, height,
    } = e.target.getBoundingClientRect();

    const hoverNode = this.mainPhotoRef.current;
    const wOffset = hoverNode.offsetWidth / 2;
    const hOffset = hoverNode.offsetHeight / 2;

    // calculate new backgroundPosition and hover box based on mouse coordinates
    // eslint-disable-next-line no-undef
    const mouseX = e.pageX - left - window.pageXOffset;
    // eslint-disable-next-line no-undef
    const mouseY = e.pageY - top - window.pageYOffset;
    const xPosition = (mouseX / width) * 100;
    const yPosition = (mouseY / height) * 100;

    let x = mouseX - wOffset;
    let y = mouseY - hOffset;

    if (mouseX > width - wOffset) {
      x = width - (2 * wOffset) + ((400 - width) / 2);
    }
    if (mouseX < wOffset) {
      x = ((400 - width) / 2);
    }
    if (mouseY > height - hOffset) {
      y = height - (2 * hOffset) + ((400 - height) / 2);
    }
    if (mouseY < hOffset) {
      y = ((400 - height) / 2);
    }

    hoverNode.style.left = `${x}px`;
    hoverNode.style.top = `${y}px`;

    this.setState({
      zoomBackgroundPosition: `${xPosition}% ${yPosition}%`,
    });
  }

  render() {
    const { photo, nextClick, prevClick, productName } = this.props;
    const {
      portalOn, zoomOn, zoomBackgroundPosition, hoverOn,
    } = this.state;

    return (
      <>

        <MainPhotoWrapper
          onMouseEnter={this.handleMainPhotoMouseEnter}
          onMouseLeave={this.handleMainPhotoMouseLeave}
          onClick={this.handlePortalCreate}
        >

          {
            hoverOn
            && (
              <MainPhotoHover
                ref={this.mainPhotoRef}
              />
            )
          }
          <img
            src={photo}
            onMouseMove={this.handleMainPhotoMouseMove}
            alt=""
          />

        </MainPhotoWrapper>
        {
          portalOn
          && (
            <MainPhotoPortalWrapper>
              <MainPhotoPortal
                onClick={this.handlePortalClose}
                photo={photo}
                productName={productName}
                nextClick={nextClick}
                prevClick={prevClick}
              />
            </MainPhotoPortalWrapper>
          )
        }
        {
          zoomOn
          && (
            <ZoomPortalWrapper>
              <ZoomPortal
                photo={photo}
                backgroundPosition={zoomBackgroundPosition}
              />
            </ZoomPortalWrapper>
          )
        }
      </>
    );
  }
}

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  nextClick: PropTypes.func.isRequired,
  prevClick: PropTypes.func.isRequired,
};
