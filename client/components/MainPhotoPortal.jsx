import React from 'react';
import styled from 'styled-components';

const PortalStyle = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-rows: auto min-content;
  grid-template-columns: min-content auto min-content;
  grid-template-areas: "prev main next"
                       "desc desc desc";
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ImageStyle = styled.img`
  grid-area: main;
  width: 600px
`;

const PrevStyle = styled.button`
  grid-area: prev;

  width: 58px;
  height: 58px;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-left-white.svg') no-repeat;
  background-attachment: scroll;
  background-origin: padding-box;
  background-clip: border-box;
  background-color: transparent;
  background-size: 15px 26px;
  display: block;
  position: relative;
  align-text: left;
  justify-content: center;
  cursor: pointer;
  border: none;
`;


const MainPhotoPortal = ({ photo, onClick }) => (
  <PortalStyle onClick={onClick}>
    <PrevStyle />
    <ImageStyle src={photo} alt="zoomed-pet" />
  </PortalStyle>
);

export default MainPhotoPortal;