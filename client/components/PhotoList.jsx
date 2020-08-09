import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail.jsx';

const PhotoList = ({ photos, s3 }) => {
  return (
    <div>
      {photos.map((photo, index) => <Thumbnail photo={photo} key={index} s3={s3} />)}
    </div>
  );
};

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.array,
  s3: PropTypes.string
};