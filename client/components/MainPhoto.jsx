/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainPhotoPortalWrapper from './MainPhotoPortalWrapper';
import MainPhotoPortal from './MainPhotoPortal';
import ZoomPortalWrapper from './ZoomPortalWrapper';
import ZoomPortal from './ZoomPortal';

const MainPhotoWrapper = styled.div`
  grid-area: main;
  display: flex;
  position: relative;
  background: ${(props) => `url(${props.photo})`} no-repeat;
  background-position: center center;
  align-self: center;
  justify-self: center;
  box-sizing: border-box;
  height: 400px;
  width: 400px;
  ${'' /* border: 5px solid red; */}
`;

// const PhotoHoverDiv = styled.div`
//   height: 100px;
//   width: 100px;
//   background: rgba(255, 255, 255, .75);
//   position: absolute;
//   top: ${(props) => `${props.hoverY - 50}px`};
//   left: ${(props) => `${props.hoverX - 50}px`};

// `;

class MainPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portalOn: false,
      zoomOn: false,
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

    });
  }

  handleMainPhotoMouseLeave() {
    this.setState({
      zoomOn: false,

    });
  }

  handleMainPhotoMouseMove(e) {
    // get main photo screen coordinates and width/height
    const {
      left, top, width, height,
    } = e.target.getBoundingClientRect();

    // calculate new backgroundPosition based on mouse coordinates
    const xPosition = (e.pageX - left) / width * 100;
    const yPosition = (e.pageY - top) / height * 100;

    // const hoverX = e.clientX - left;
    // const hoverY = e.clientY - top;
    // console.log(e.pageX, e.pageY);
    // console.log(e.clientX - left, e.clientY - top);
    this.setState({
      zoomBackgroundPosition: `${xPosition}% ${yPosition}%`,
    });
  }

  render() {
    const { photo, nextClick, prevClick } = this.props;
    const { portalOn, zoomOn, zoomBackgroundPosition } = this.state;

    return (
      <>

        <MainPhotoWrapper
          photo={photo}
          onClick={this.handlePortalCreate}
          onMouseMove={this.handleMainPhotoMouseMove}
          onMouseEnter={this.handleMainPhotoMouseEnter}
          onMouseLeave={this.handleMainPhotoMouseLeave}
        />
        {
          portalOn
          && (
            <MainPhotoPortalWrapper>
              <MainPhotoPortal
                onClick={this.handlePortalClose}
                photo={photo}
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
  nextClick: PropTypes.func.isRequired,
  prevClick: PropTypes.func.isRequired,
};
