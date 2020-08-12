import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  border: 1px solid #ddd;
`;


const Thumbnail = ({ photo, s3 }) => (

  <Thumb src={s3 + photo}></Thumb>

);

export default Thumbnail;

Thumbnail.propTypes = {
  photo: PropTypes.string,
  s3: PropTypes.string
};