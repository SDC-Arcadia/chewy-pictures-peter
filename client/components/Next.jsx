import React from 'react';
import styled from 'styled-components';

const NextWrapper = styled.div`
  grid-area: next;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-bottom-ddd-grey.svg') 50% no-repeat;
  background-size: 18px;

  @media screen and (max-width: 650px) {
    background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-right-ddd-grey.svg') 50% no-repeat;
    background-size: 12px;
    width: 25px;
  }
`;

const NextTag = styled.a`
  display: none;
`;

const Next = () => (
  <NextWrapper>
    <NextTag href="">Next</NextTag>
  </NextWrapper>
);

export default Next;
