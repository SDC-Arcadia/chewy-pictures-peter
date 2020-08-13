import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

const List = styled.div`
`;

const PhotoList = ({ photos, activeThumb, onMouseOver }) => (
  <List>
    {photos.map((photo) => (
      <Thumbnail
        photo={photo}
        key={photo}
        activeThumb={activeThumb}
        onMouseOver={onMouseOver}
      />
    ))}
  </List>
);

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeThumb: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
