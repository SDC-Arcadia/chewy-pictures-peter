import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

const ThumbnailListWrapper = styled.div`
  ${'' /* display: inline-block;
  border: 5px solid blue; */}
  grid-area: thumbs;
  display: flex;
  border: 5px dotted red;

  @media screen and (min-width: 650px) {
    flex-direction: column;
  }
`;

const PhotoList = ({ photos, activeThumb, onMouseOver }) => (
  <ThumbnailListWrapper>
    {photos.map((photo) => (
      <Thumbnail
        photo={photo}
        key={photo}
        activeThumb={activeThumb}
        onMouseOver={onMouseOver}
      />
    ))}
  </ThumbnailListWrapper>
);

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeThumb: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
