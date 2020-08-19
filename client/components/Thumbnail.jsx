import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ThumbWrapper = styled.div`
  display: block;
  border: 10px dotted cyan;
`;

const Thumb = styled.img`
  border-radius: 4px;
  box-sizing: border-box;
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
`;

const Thumbnail = ({ photo, activeThumb, onMouseOver }) => {
  if (photo === activeThumb) {
    return (
      <ThumbWrapper>
        <Thumb active src={photo} onMouseEnter={onMouseOver} />
      </ThumbWrapper>
    );
  }
  return (
    <ThumbWrapper>
      <Thumb src={photo} onMouseEnter={onMouseOver} />
    </ThumbWrapper>
  );
};

export default Thumbnail;

Thumbnail.propTypes = {
  photo: PropTypes.string.isRequired,
  activeThumb: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
