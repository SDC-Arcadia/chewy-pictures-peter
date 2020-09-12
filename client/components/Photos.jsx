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
// import HoverPortalWrapper from './HoverPortalWrapper';
// import HoverPortal from './HoverPortal';

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
  ${'' /* border: 5px solid blue; */}
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
      hoverOn: false,
      zoomBackgroundPosition: '0% 0%',
      hoverX: '0',
      hoverY: '0',
    };

    this.handleThumbnailMouseOver = this.handleThumbnailMouseOver.bind(this);
    this.handlePortalCreate = this.handlePortalCreate.bind(this);
    this.handlePortalClose = this.handlePortalClose.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleMainPhotoMouseMove = this.handleMainPhotoMouseMove.bind(this);
    this.handleMainPhotoMouseEnter = this.handleMainPhotoMouseEnter.bind(this);
    this.handleMainPhotoMouseLeave = this.handleMainPhotoMouseLeave.bind(this);
    this.handleZoomPrevClick = this.handleZoomPrevClick.bind(this);
    this.handleZoomNextClick = this.handleZoomNextClick.bind(this);
  }

  componentDidMount() {
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
      prevPhotos, currentPhotos, nextPhotos,
    } = this.state;

    const { photoList } = this.state;

    const lastPhotoIndex = photoList.indexOf(currentPhotos[currentPhotos.length - 1]);
    // check if at end of photoList

    if (photoList.length - 1 > lastPhotoIndex) {
      // still more photos
      prevPhotos = currentPhotos.slice();
      currentPhotos = nextPhotos.slice(0, 6);

      const nextPhotoIndex = photoList.indexOf(currentPhotos[currentPhotos.length - 1]);
      nextPhotos = photoList.slice(nextPhotoIndex + 1, nextPhotoIndex + 7);
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

    const hoverX = e.clientX - left;
    const hoverY = e.clientY - top;
    // console.log(e.pageX, e.pageY);
    console.log(e.clientX - left, e.clientY - top);
    this.setState({
      zoomBackgroundPosition: `${xPosition}% ${yPosition}%`,
      hoverX,
      hoverY,
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

  handleZoomPrevClick() {
    // find index of current activeThumb
    const { activeThumb, photoList } = this.state;

    const currentThumbIndex = (photoList.indexOf(activeThumb) - 1
      + photoList.length) % photoList.length;
    // set new active thumb to 1 less of index, utilize circular array
    this.setState({
      activeThumb: photoList[currentThumbIndex],
      mainPhoto: photoList[currentThumbIndex],
    });
  }

  handleZoomNextClick() {
    // find index of current activeThumb
    const { activeThumb, photoList } = this.state;

    const currentThumbIndex = (photoList.indexOf(activeThumb) + 1) % photoList.length;
    // set new active thumb to 1 less of index, utilize circular array
    this.setState({
      activeThumb: photoList[currentThumbIndex],
      mainPhoto: photoList[currentThumbIndex],
    });
  }

  render() {
    const {
      photoList,
      currentPhotos,
      nextPhotos,
      prevPhotos,
      mainPhoto,
      activeThumb,
      portalOn,
      zoomOn,
      zoomBackgroundPosition,
      hoverX,
      hoverY,
    } = this.state;
    return (
      <div>
        <Container>
          <Prev
            handleClick={this.handlePrevClick}
            photos={prevPhotos.length}
          />
          <PhotoList
            photos={currentPhotos}
            activeThumb={activeThumb}
            onMouseOver={this.handleThumbnailMouseOver}
          />
          <MainPhoto
            photo={mainPhoto}
            hoverX={hoverX}
            hoverY={hoverY}
            onClick={this.handlePortalCreate}
            onMove={this.handleMainPhotoMouseMove}
            onEnter={this.handleMainPhotoMouseEnter}
            onLeave={this.handleMainPhotoMouseLeave}
          />
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
                nextClick={this.handleZoomNextClick}
                prevClick={this.handleZoomPrevClick}
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
