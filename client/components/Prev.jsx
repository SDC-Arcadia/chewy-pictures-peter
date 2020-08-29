import React from 'react';
import styled from 'styled-components';

const PrevWrapper = styled.div`
  grid-area: prev;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-top-ddd-grey.svg') 50% no-repeat;
  background-size: 18px;
  height: 20px;

  @media screen and (max-width: 650px) {
    background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-left-ddd-grey.svg') 50% no-repeat;
    background-size: 12px;
    width: 25px;
  }
`;

const PrevTag = styled.a`
  display: none;
`;

const Prev = ({ handleClick }) => (
  <PrevWrapper onClick={handleClick}>
    <PrevTag href="">Prev</PrevTag>
  </PrevWrapper>
);

export default Prev;
