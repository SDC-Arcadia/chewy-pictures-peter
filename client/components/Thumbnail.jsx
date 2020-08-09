import React from 'react';
import PropTypes from 'prop-types';


const Thumbnail = ({ photo, s3 }) => (

  <img src={s3 + photo}></img>

);

export default Thumbnail;

Thumbnail.propTypes = {
  photo: PropTypes.string,
  s3: PropTypes.string
};