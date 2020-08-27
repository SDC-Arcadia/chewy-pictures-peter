import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhotoList from './PhotoList';
import MainPhoto from './MainPhoto';
import Prev from './Prev';
import Next from './Next';
import Zoom from './Zoom';
import MainPhotoPortalWrapper from './MainPhotoPortalWrapper';
import MainPhotoPortal from './MainPhotoPortal';

const SERVER_URL = 'http://localhost:3004';

const Container = styled.div`
  margin: 25px;
  display: grid;

  grid-template-rows: min-content min-content min-content;
  grid-template-columns: min-content min-content;
  grid-template-areas: "prev main"
                       "thumbs main"
                       "next zoom";

  @media screen and (max-width: 650px) {
    grid-template-rows: min-content min-content;
    grid-template-columns: min-content min-content min-content;
    grid-template-areas: "main main main"
                         "zoom zoom zoom"
                         "prev thumbs next";
  }
  grid-gap: 10px;
  border: 5px solid blue;
`;

const MainPhotoWrapper = styled.div`
  grid-area: main;
  box-sizing: border-box;
  height: 400px;
  width: 440px;
`;

export default class Photos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoList: [],
      mainPhoto: '',
      activeThumb: '',
      portalOn: false,
    };

    this.handleThumbnailMouseOver = this.handleThumbnailMouseOver.bind(this);
    this.handlePortalCreate = this.handlePortalCreate.bind(this);
    this.handlePortalClose = this.handlePortalClose.bind(this);
  }

  componentDidMount() {
    // initial product was passed as props.product
    // fetch photos for that product and update state

    // eslint-disable-next-line no-undef
    const parsedUrl = new URL(window.location.href);
    const productId = parsedUrl.searchParams.get('productId');

    axios.get(`${SERVER_URL}/photos/${productId}`)
      .then((response) => {
        if (response.data.error) {
          throw Error(response.data.error);
        }
        // add images in response data to array and set state
        const imgArray = response.data.image_urls.slice();

        this.setState({
          photoList: imgArray,
          mainPhoto: imgArray[0],
          activeThumb: imgArray[0],
        });
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log('Error Fetching Product Images:', error));
  }

  handleThumbnailMouseOver(e) {
    const updatedImg = e.target.src;
    this.setState({
      mainPhoto: updatedImg,
      activeThumb: updatedImg,
    });
  }

  handlePortalCreate() {
    this.setState({
      portalOn: true,
    });
  }

  handlePortalClose() {
    this.setState({
      portalOn: false,
    });
  }

  render() {
    const {
      photoList,
      mainPhoto,
      activeThumb,
      portalOn,
    } = this.state;
    return (
      <div>
        <Container>
          <Prev />
          <PhotoList
            photos={photoList}
            activeThumb={activeThumb}
            onMouseOver={this.handleThumbnailMouseOver}
          />

          <MainPhotoWrapper>
            <MainPhoto
              photo={mainPhoto}
              onClick={this.handlePortalCreate}
            />
          </MainPhotoWrapper>
          <Zoom />
          <Next />
        </Container>
        {
          // eslint-disable-next-line operator-linebreak
          portalOn &&
          (
            <MainPhotoPortalWrapper>
              <MainPhotoPortal
                onClick={this.handlePortalClose}
                photo={mainPhoto}
              />
            </MainPhotoPortalWrapper>
          )
        }
      </div>
    );
  }
}
