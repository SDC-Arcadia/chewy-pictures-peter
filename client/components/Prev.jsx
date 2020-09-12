/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const greyPrevArrowTop = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-top-ddd-grey.svg';
const bluePrevArrowTop = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-top-blue.svg';
const greyPrevArrowLeft = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-left-ddd-grey.svg';
const bluePrevArrowLeft = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-left-blue.svg';

const PrevWrapper = styled.div`
  grid-area: prev;
  background: ${(props) => props.photos ? `url(${bluePrevArrowTop})` : `url(${greyPrevArrowTop})` } 50% no-repeat;
  background-size: 18px;
  height: 20px;

  @media screen and (max-width: 650px) {
    background: ${(props) => props.photos ? `url(${bluePrevArrowLeft})` : `url(${greyPrevArrowLeft})` } 50% no-repeat;
    background-size: 12px;
    width: 25px;
  }
`;

const PrevTag = styled.a`
  display: none;
`;

const Prev = ({ photos, handleClick }) => (
  <PrevWrapper photos={!!photos} onClick={handleClick}>
    <PrevTag href="">Prev</PrevTag>
  </PrevWrapper>
);

export default Prev;

Prev.propTypes = {
  photos: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};