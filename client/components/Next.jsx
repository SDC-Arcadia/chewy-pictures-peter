import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const arrowUrls = {
  fullScreen: {

  }
}

const NextWrapper = styled.div`
  grid-area: next;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-bottom-ddd-grey.svg') 50% no-repeat;
  background-size: 18px;
  height: 20px;

  @media screen and (max-width: 650px) {
    background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-right-ddd-grey.svg') 50% no-repeat;
    background-size: 12px;
    width: 25px;
  }
`;

const NextTag = styled.a`
  display: none;
`;

const Next = ({ nextPhotos, handleClick }) => {

  // let nextUrl;
  // if (nextPhotos) {
  //   console.log('should not fire');
  //   nextUrl = 'https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-bottom-blue.svg'
  // } else {
  //   nextUrl = `url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-bottom-ddd-grey.svg') 50% no-repeat;`
  // }
  // console.log('nextPhotos in next', nextPhotos);
  // console.log('next url', nextUrl);
  return (
  <NextWrapper onClick={handleClick}>
    <NextTag href="">Next</NextTag>
  </NextWrapper>
);

  }

export default Next;

Next.PropTypes = {
  nextPhotos: PropTypes.number.isRequired,
}

