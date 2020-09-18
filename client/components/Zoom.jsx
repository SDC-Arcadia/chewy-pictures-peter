import React from 'react';
import styled from 'styled-components';

const ZoomWrapper = styled.div`
  grid-area: zoom;
  text-align: center;
  font-size: 1em;
  color: #555;
  font-family: Roboto,serif;

  ::before {
    content: "";
    width: 27px;
    height: 20px;
    display: inline-block;
    background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/zoom-grey.svg') 0 no-repeat;
    backgroung-attachment: scroll;
    background-clip: border-box;
    background-origin: padding-box;
    background-position: 0px 50%;
    background-size: 19px;
    vertical-align: -5px;
  }

`;

const Zoom = () => (
  <ZoomWrapper>
    Roll over image to zoom in
  </ZoomWrapper>
);

export default Zoom;
