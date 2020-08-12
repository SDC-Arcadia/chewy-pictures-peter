import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

const List = styled.div`
  flex-direction: column;
  ${'' /* width: 100px;
  justify-content: center; */}
`;

const PhotoList = ({ photos, onMouseOver }) => (
  <List>
    {photos.map((photo) => <Thumbnail photo={photo} key={photo} onMouseOver={onMouseOver} />)}
  </List>
);

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
