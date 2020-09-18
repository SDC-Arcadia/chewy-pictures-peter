/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Thumb = styled.img`
  display: flex;
  border-radius: 4px;
  box-sizing: border-box;
  width: ${(props) => props.thumbWidth};
  height: 60px;
  padding: ${(props) => props.thumbPadding};
  margin: 0 4px 6px 0;
  border: ${(props) => props.active ? '2px solid orange' : '1px solid #ddd'};
`;

const Thumbnail = ({
  photo, activeThumb, onMouseOver, thumbDirection,
}) => {
  const thumbPadding = thumbDirection === 'column' ? '1px 17px' : '1px 7px';
  const thumbWidth = thumbDirection === 'column' ? '90px' : '70px';

  return (
    <Thumb
      active={photo === activeThumb}
      thumbPadding={thumbPadding}
      thumbWidth={thumbWidth}
      src={photo}
      onMouseEnter={onMouseOver}
    />
  );
};

export default Thumbnail;

Thumbnail.propTypes = {
  photo: PropTypes.string.isRequired,
  activeThumb: PropTypes.string.isRequired,
  thumbDirection: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
