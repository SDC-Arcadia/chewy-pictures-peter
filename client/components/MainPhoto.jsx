/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

const MainPhoto = ({ photo, onClick, onMove }) => (
  <div onClick={onClick} onMouseMove={onMove}>
    <img src={photo} alt="pet" />
  </div>
);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
