/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const greyNextArrowBottom = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-bottom-ddd-grey.svg';
const blueNextArrowBottom = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-bottom-blue.svg';
const greyNextArrowRight = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-right-ddd-grey.svg';
const blueNextArrowRight = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-right-blue.svg';

const NextWrapper = styled.div`
  grid-area: next;
  background: ${(props) => props.photos ? `url(${blueNextArrowBottom})` : `url(${greyNextArrowBottom})` } 50% no-repeat;
  background-size: 18px;
  height: 20px;

  @media screen and (max-width: 650px) {
    background: ${(props) => props.photos ? `url(${blueNextArrowRight})` : `url(${greyNextArrowRight})` } 50% no-repeat;
    background-size: 12px;
    width: 25px;
  }
`;

const NextTag = styled.a`
  display: none;
`;

const Next = ({ nextPhotos, handleClick }) => (
  <NextWrapper photos={!!nextPhotos} onClick={handleClick}>
    <NextTag href="">Next</NextTag>
  </NextWrapper>
);

export default Next;

Next.propTypes = {
  nextPhotos: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
