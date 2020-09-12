import React from 'react';
import styled from 'styled-components';

// // const ZoomedImg = styled.img`
// //   ${'' /* background-position: ${(props) => props.backgroundPosition}; */}
// //   width: 400px;
// // `;

const HoverDiv = styled.div`
  ${'' /* background-position: ${(props) => props.backgroundPosition};
  background-image: ${(props) => `url(${props.photo})`};
  background-size: 1200px;
  background-repeat: no-repeat;
  z-index: 999;
  width: 600px;
  height: 600px; */}
`;

const HoverPortal = (props) => (

  <HoverDiv />

);

export default HoverPortal;
