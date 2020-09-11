import React from 'react';
import styled from 'styled-components';

// const ZoomedImg = styled.img`
//   ${'' /* background-position: ${(props) => props.backgroundPosition}; */}
//   width: 400px;
// `;

const ZoomedDiv = styled.div`
  background-position: ${(props) => props.backgroundPosition};
  background-image: ${(props) => `url(${props.photo})`};
  background-size: 1200px;
  background-repeat: no-repeat;
  z-index: 999;
  width: 600px;
  height: 600px;
`;

const ZoomPortal = ({
  photo, backgroundPosition,
}) => (

  <ZoomedDiv
    backgroundPosition={backgroundPosition}
    photo={photo}
  />

);

export default ZoomPortal;
