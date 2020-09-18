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
  background: ${(props) => `url(${props.bg})`} 50% no-repeat;
  background-size: ${(props) => props.bgs};
  height: ${(props) => props.h};
  width: ${(props) => props.w};
`;

const PrevTag = styled.a`
  display: none;
`;

const Prev = ({ photos, handleClick, thumbDirection }) => {
  let bg;
  let bgs;
  let h;
  let w;

  if (thumbDirection === 'column') {
    // eslint-disable-next-line no-extra-boolean-cast
    bg = (!!photos) ? bluePrevArrowTop : greyPrevArrowTop;
    bgs = '18px';
    h = '20px';
    w = '104px';
  } else {
    // eslint-disable-next-line no-extra-boolean-cast
    bg = (!!photos) ? bluePrevArrowLeft : greyPrevArrowLeft;
    bgs = '12px';
    h = '20px';
    w = '25px';
  }
  return (
    <PrevWrapper bg={bg} bgs={bgs} w={w} h={h} onClick={handleClick}>
      <PrevTag href="">Prev</PrevTag>
    </PrevWrapper>
  );
};

export default Prev;

Prev.propTypes = {
  photos: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  thumbDirection: PropTypes.string.isRequired,
};