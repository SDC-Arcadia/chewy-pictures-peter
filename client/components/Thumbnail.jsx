import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Thumb = styled.img`
  display: flex;
  border-radius: 4px;
  box-sizing: border-box;
  width: 90px;
  height: 60px;
  float: left;
  vertical-align: middle;
  text-align: center;
  padding: 1px 17px 1px 17px;
  margin: 0 4px 6px 0;
  ${'' /* eslint-disable-next-line no-confusing-arrow */}
  border: ${(props) => props.active ? '2px solid orange' : '1px solid #ddd'};
`;

const Thumbnail = ({ photo, activeThumb, onMouseOver }) => (
  <Thumb
    active={photo === activeThumb}
    src={photo}
    onMouseEnter={onMouseOver}
  />
);

export default Thumbnail;

Thumbnail.propTypes = {
  photo: PropTypes.string.isRequired,
  activeThumb: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};
