/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainPhotoWrapper = styled.div`
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 400px;
  width: 440px;
`;

const MainPhoto = ({ photo, onClick, onMove, onEnter, onLeave }) => (
  <MainPhotoWrapper
    onClick={onClick}
    onMouseMove={onMove}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    <img src={photo} alt="pet" />
  </MainPhotoWrapper>
);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
