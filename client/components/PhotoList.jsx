import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

const ThumbnailListWrapper = styled.div`
  grid-area: thumbs;
  display: flex;
  align-items: flex-start;
  position: relative;
  height: ${(props) => props.height};
  flex-direction: ${(props) => props.thumbDirection};
  width: 100%;
`;

const PhotoList = ({
  photos, activeThumb, thumbDirection, onMouseOver,
}) => {
  const height = thumbDirection === 'column' ? '390px' : '70px';

  return (
    <ThumbnailListWrapper
      thumbDirection={thumbDirection}
      height={height}
    >

      {photos.map((photo) => (
        <Thumbnail
          photo={photo}
          key={photo}
          thumbDirection={thumbDirection}
          activeThumb={activeThumb}
          onMouseOver={onMouseOver}
        />
      ))}

    </ThumbnailListWrapper>
  );
};

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeThumb: PropTypes.string.isRequired,
  thumbDirection: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
