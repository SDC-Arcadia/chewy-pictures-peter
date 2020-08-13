import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ThumbContainer = styled.div`

  ${'' /* display: block;
  width: 100px;
  height: 100px; */}
`;

const Thumb = styled.img`
  border-radius: 4px;
  width: 70px;
  height: 60px;
  display: block;
  float: left;
  vertical-align: middle;
  text-align: center;
  padding: 1px 6px;
  margin: 0 4px 4px 0;
  ${'' /* eslint-disable-next-line no-confusing-arrow */}
  border: ${(props) => props.active ? '2px solid orange' : '1px solid #ddd'};

  ${'' /* ${ThumbContainer}:hover & {
    border: 2px solid orange;
  } */}
`;

const Thumbnail = ({ photo, activeThumb, onMouseOver }) => {
  if (photo === activeThumb) {
    return (
      <ThumbContainer>
        <Thumb active src={photo} onMouseEnter={onMouseOver} />
      </ThumbContainer>
    );
  }
  return (
    <ThumbContainer>
      <Thumb src={photo} onMouseEnter={onMouseOver} />
    </ThumbContainer>
  );
};

export default Thumbnail;

Thumbnail.propTypes = {
  photo: PropTypes.string.isRequired,
  activeThumb: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
