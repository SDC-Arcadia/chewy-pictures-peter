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
  background: ${(props) => `url(${props.bg})`} 50% no-repeat;
  background-size: ${(props) => props.bgs};
  height: ${(props) => props.h};
  width: ${(props) => props.w};
`;

const NextTag = styled.a`
  display: none;
`;

const Next = ({ nextPhotos, handleClick, thumbDirection }) => {
  let bg;
  let bgs;
  let h;
  let w;

  if (thumbDirection === 'column') {
    // eslint-disable-next-line no-extra-boolean-cast
    bg = (!!nextPhotos) ? blueNextArrowBottom : greyNextArrowBottom;
    bgs = '18px';
    h = '20px';
    w = '104px';
  } else {
    // eslint-disable-next-line no-extra-boolean-cast
    bg = (!!nextPhotos) ? blueNextArrowRight : greyNextArrowRight;
    bgs = '12px';
    h = '25px';
    w = '20px';
  }

  return (
    <NextWrapper bg={bg} bgs={bgs} w={w} h={h} onClick={handleClick}>
      <NextTag href="">Next</NextTag>
    </NextWrapper>
  );
};

export default Next;

Next.propTypes = {
  nextPhotos: PropTypes.number.isRequired,
  thumbDirection: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
