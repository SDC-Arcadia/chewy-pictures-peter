import React from 'react';
import PropTypes from 'prop-types';

const MainPhoto = ({ photo, onClick }) => (
  <div onClick={onClick}>
    <img src={photo} alt="pet" />
  </div>
);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
};
