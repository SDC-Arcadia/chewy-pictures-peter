import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PortalStyle = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-areas: "close close close"
                       "prev main next"
                       "desc desc desc";
  align-content: center;
  justify-content: center;
  z-index: 999;
`;

const ImageStyle = styled.img`
  grid-area: main;
  dislay: flex;
  justify-self: center;
  align-self: center;
  height: 90vh;
  max-height: 90vh;
  width: auto;
`;

const ZoomedPrevDiv = styled.div`
  grid-area: prev;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ZoomedPrevStyle = styled.div`
  width: 58px;
  height: 58px;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-left-white.svg') no-repeat;
  background-color: transparent;
  background-position: right center;
`;

const ZoomedNextDiv = styled.div`
  grid-area: next;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ZoomedNextStyle = styled.div`
  width: 58px;
  height: 58px;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/arrow-right-white.svg') no-repeat;
  background-color: transparent;
  background-position: left center;
  z-index: 1000;
`;

const ZoomedCloseStyle = styled.div`
  grid-area: close;
  width: 58px;
  height: 58px;
  background: url('https://rpt22-fec-kwame.s3-us-west-1.amazonaws.com/images/static/icon-close-white.svg') no-repeat;
  background-color: transparent;
  background-position-y: bottom;
  background-size: 50%;
  justify-self: end;
`;

const ProductNameStyle = styled.div`
  grid-area: desc;
  color: white;
  font-size: 1.5rem;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
`;

const MainPhotoPortal = ({
  photo,
  onClick,
  nextClick,
  prevClick,
  productName,
}) => (
  <PortalStyle>
    <ZoomedPrevDiv>
      <ZoomedPrevStyle onClick={prevClick} />
    </ZoomedPrevDiv>

    <ImageStyle onClick={onClick} src={photo} alt="zoomed-pet" />
    <ZoomedNextDiv>
      <ZoomedNextStyle onClick={nextClick} />
      </ZoomedNextDiv>

      <ProductNameStyle>
      {productName}
      </ProductNameStyle>

    <ZoomedCloseStyle onClick={onClick} />

  </PortalStyle>
);

export default MainPhotoPortal;

MainPhotoPortal.propTypes = {
  photo: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  nextClick: PropTypes.func.isRequired,
  prevClick: PropTypes.func.isRequired,
};
