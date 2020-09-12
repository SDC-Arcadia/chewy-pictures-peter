/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const PhotoHoverDiv = styled.div`
  height: 100px;
  width: 100px;
  background: rgba(255, 255, 255, .75);
  position: absolute;
  top: ${(props) => `${props.hoverY - 50}px`};
  left: ${(props) => `${props.hoverX - 50}px`};

`;

const MainPhoto = ({
  photo, hoverX, hoverY, onClick, onMove, onEnter, onLeave,
}) => (
  <MainPhotoWrapper
    id="main-photo"
    photo={photo}
    onClick={onClick}
    onMouseMove={onMove}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    {/* <PhotoHoverDiv
      hoverX={hoverX}
      hoverY={hoverY}

    /> */}
    <div style={{
      top: hoverY - 50,
      left: hoverX - 50,
      height: '100px',
      width: '100px',
      background: 'rgba(255, 255, 255, 0.75)',
      position: 'absolute',
    }}
    />
    {/* <img src={photo} alt="pet" /> */}
  </MainPhotoWrapper>
);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
