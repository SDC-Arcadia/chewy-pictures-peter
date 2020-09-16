import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

const ThumbnailListWrapper = styled.div`
  ${'' /* display: inline-block;
  border: 5px solid blue; */}
  grid-area: thumbs;
  display: flex;
  height: ${(props) => props.height};
  flex-direction: ${(props) => props.thumbDirection};
  width: 100%;
  border: 5px dotted red;
  overflow: hidden;
    white-space: nowrap;
    position: relative;

  ${'' /* @media screen and (max-width: 650px) {
    flex-direction: row;
    min-width: 0;
    width: 100%;
    height: 70px; */}


  }
`;

// const ThumbnailViewport = styled.div`
//     display: flex;
//     grid-area: thumbs;
//     position: relative;
// `;

const PhotoList = ({
  photos, activeThumb, thumbDirection, onMouseOver,
}) => {
  const height = thumbDirection === 'column' ? '390px' : '70px';

  return (

    // <ThumbnailViewport>
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
    // </ThumbnailViewport>
  );
};

export default PhotoList;

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeThumb: PropTypes.string.isRequired,
  thumbDirection: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
