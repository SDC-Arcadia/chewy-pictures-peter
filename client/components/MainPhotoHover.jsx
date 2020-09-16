import React from 'react';
import styled from 'styled-components';

const HoverDiv = styled.div`
   height: 150px;
   width: 150px;
   background: rgba(255, 255, 255, .75);
   position: absolute;
   cursor: none;
`;

const MainPhotoHover = React.forwardRef((props, ref) => (

  <HoverDiv
    ref={ref}
  />

));

export default MainPhotoHover;
