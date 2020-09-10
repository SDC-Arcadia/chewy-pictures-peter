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
import ZoomPortalWrapper from './ZoomPortalWrapper';
import ZoomPortal from './ZoomPortal';

// const SERVER_URL = 'http://localhost:3004';
const SERVER_URL = 'http://ec2-13-57-207-233.us-west-1.compute.amazonaws.com:3004';

const Container = styled.div`
  margin: 25px;
  display: grid;
  width: 650px;
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
      currentPhotos: [],
      prevPhotos: [],
      nextPhotos: [],
      mainPhoto: '',
      activeThumb: '',
      portalOn: false,
      zoomOn: false,
      zoomBackgroundPosition: '0% 0%',
    };

    this.handleThumbnailMouseOver = this.handleThumbnailMouseOver.bind(this);
    this.handlePortalCreate = this.handlePortalCreate.bind(this);
    this.handlePortalClose = this.handlePortalClose.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleMainPhotoMouseMove = this.handleMainPhotoMouseMove.bind(this);
    this.handleMainPhotoMouseEnter = this.handleMainPhotoMouseEnter.bind(this);
    this.handleMainPhotoMouseLeave = this.handleMainPhotoMouseLeave.bind(this);
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
        const photoList = response.data.image_urls.slice();
        const currentPhotos = photoList.slice(0, 6);
        const nextPhotos = photoList.slice(6);

        // console.log('currentphotos', currentPhotos);
        // console.log('nextphotos', nextPhotos);

        this.setState({
          photoList,
          currentPhotos,
          nextPhotos,
          mainPhoto: photoList[0],
          activeThumb: photoList[0],
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

  handlePrevClick() {
    let {
      prevPhotos, currentPhotos, photoList, nextPhotos,
    } = this.state;

    // check to see if at the beginning of photo list
    const firstPhotoIndex = photoList.indexOf(currentPhotos[0]);

    if (firstPhotoIndex !== 0) {
      // not at the beginning, so backtrack
      nextPhotos = currentPhotos.slice();
      currentPhotos = prevPhotos.slice();
      prevPhotos = photoList.slice(firstPhotoIndex - 7, firstPhotoIndex - 1);

      this.setState({
        prevPhotos,
        currentPhotos,
        nextPhotos,
      });
    }
  }

  handleNextClick() {
    // set prev photos to current photos
    // get index of photolist of last current photo
    // set new current to i + indexof

    let {
      prevPhotos, currentPhotos, photoList, nextPhotos,
    } = this.state;

    const lastPhotoIndex = photoList.indexOf(currentPhotos[currentPhotos.length - 1]);
    // check if at end of photoList

    if (photoList.length - 1 > lastPhotoIndex) {
      // still more photos
      prevPhotos = currentPhotos.slice();
      currentPhotos = nextPhotos.slice(0, 6);
      nextPhotos = photoList.slice(lastPhotoIndex + 1, lastPhotoIndex + 7);
      this.setState({
        prevPhotos,
        currentPhotos,
        nextPhotos,
      });
    }
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

  handleMainPhotoMouseMove(e) {
    // console.log(e.target.getBoundingClientRect());
    // get main photo screen coordinates and width/height
    const {
      left, top, width, height,
    } = e.target.getBoundingClientRect();

    // calculate new backgroundPosition based on mouse coordinates
    const xPosition = (e.pageX - left) / width * 100;
    const yPosition = (e.pageY - top) / height * 100;
    // console.log(e.pageX, e.pageY);

    this.setState({
      zoomBackgroundPosition: `${xPosition}% ${yPosition}%`,
    });
  }

  handleMainPhotoMouseEnter() {
    this.setState({
      zoomOn: true,
    });
  }

  handleMainPhotoMouseLeave() {
    this.setState({
      zoomOn: false,
    });
  }

  render() {
    const {
      photoList,
      currentPhotos,
      nextPhotos,
      mainPhoto,
      activeThumb,
      portalOn,
      zoomOn,
      zoomBackgroundPosition,
    } = this.state;
    return (
      <div>
        <Container>
          <Prev
            handleClick={this.handlePrevClick}
          />
          <PhotoList
            photos={currentPhotos}
            activeThumb={activeThumb}
            onMouseOver={this.handleThumbnailMouseOver}
          />

          <MainPhotoWrapper>
            <MainPhoto
              photo={mainPhoto}
              onClick={this.handlePortalCreate}
              onMove={this.handleMainPhotoMouseMove}
              onEnter={this.handleMainPhotoMouseEnter}
              onLeave={this.handleMainPhotoMouseLeave}
            />
          </MainPhotoWrapper>
          <Zoom />
          <Next
            nextPhotos={nextPhotos.length}
            handleClick={this.handleNextClick}
          />
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
        {
          zoomOn
          && (
            <ZoomPortalWrapper>
              <ZoomPortal
                photo={mainPhoto}
                backgroundPosition={zoomBackgroundPosition}
              />
            </ZoomPortalWrapper>
          )
        }

      </div>
    );
  }
}
