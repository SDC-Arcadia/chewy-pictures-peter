import React from 'react';
import PropTypes from 'prop-types';

const MainPhoto = ({ photo }) => (

  <img src={photo} alt="pet" />

);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
};
