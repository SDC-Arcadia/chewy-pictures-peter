import React from 'react';
import PropTypes from 'prop-types';


const MainPhoto = ({ photo, s3 }) => (

  <img src={s3 + photo}></img>

);

export default MainPhoto;

MainPhoto.propTypes = {
  photo: PropTypes.string,
  s3: PropTypes.string
};