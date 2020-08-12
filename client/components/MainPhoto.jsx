import React from 'react';
import PropTypes from 'prop-types';

const MainPhoto = ({ photo, s3 }) => (

  <img src={s3 + photo} alt="pet" />

);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  s3: PropTypes.string.isRequired,
};
