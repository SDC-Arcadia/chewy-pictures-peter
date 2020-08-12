import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail.jsx';
import styled from 'styled-components';

const List = styled.div`
  flex-direction: column;
  ${'' /* width: 100px;
  justify-content: center; */}
`


const PhotoList = ({ photos, s3 }) => {
  return (
    <List>
      {photos.map((photo, index) => <Thumbnail photo={photo} key={index} s3={s3} />)}
    </List>
  );
};

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.array,
  s3: PropTypes.string
};