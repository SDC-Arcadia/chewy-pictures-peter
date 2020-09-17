import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ZoomedDiv = styled.div.attrs((props) => ({
  style: {
    backgroundPosition: props.backgroundPosition,
  },
}))`
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

ZoomPortal.propTypes = {
  photo: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.string.isRequired,
};
