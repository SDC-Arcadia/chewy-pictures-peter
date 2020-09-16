import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhotoList from './PhotoList';
import MainPhoto from './MainPhoto';
import Prev from './Prev';
import Next from './Next';
import Zoom from './Zoom';

const SERVER_URL = 'http://ec2-13-57-207-233.us-west-1.compute.amazonaws.com:3004';

const Container = styled.div`
  margin: 25px;
  display: grid;
  width: auto;
  height: auto;
  min-width: 0;
  align-items: center;
  justify-content: center;
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
      displayThumbs: 6,
      thumbDirection: 'column',
    };

    this.handleThumbnailMouseOver = this.handleThumbnailMouseOver.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleZoomPrevClick = this.handleZoomPrevClick.bind(this);
    this.handleZoomNextClick = this.handleZoomNextClick.bind(this);
    this.handleScreenResize = this.handleScreenResize.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    const parsedUrl = new URL(window.location.href);
    const productId = parsedUrl.searchParams.get('productId');

    this.getPhotoUrl(productId);

    // set event handler to check for screen with
    window.addEventListener('resize', this.handleScreenResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenResize);
  }

  getPhotoUrl(productId) {
    axios.get(`${SERVER_URL}/photos/${productId}`)
      .then((response) => {
        if (response.data.error) {
          throw Error(response.data.error);
        }
        // add images in response data to array and set state
        this.updatePhotoState(response.data.image_urls);
        // const { displayThumbs } = this.state;
        // const photoList = response.data.image_urls.slice();
        // const currentPhotos = photoList.slice(0, displayThumbs);
        // const nextPhotos = photoList.slice(displayThumbs);

        // this.setState({
        //   photoList,
        //   currentPhotos,
        //   nextPhotos,
        //   mainPhoto: photoList[0],
        //   activeThumb: photoList[0],
        // });
      })
    // eslint-disable-next-line no-console
      .catch((error) => console.log('Error Fetching Product Images:', error));
  }

  updatePhotoState(imageUrls, displayNumber) {
    const { displayThumbs, mainPhoto } = this.state;

    const thumbsToRender = displayNumber || displayThumbs;

    const photoList = imageUrls.slice();
    const currentPhotos = photoList.slice(0, thumbsToRender);
    const nextPhotos = photoList.slice(thumbsToRender);

    this.setState({
      photoList,
      currentPhotos,
      nextPhotos,
      mainPhoto: mainPhoto || photoList[0],
      activeThumb: photoList[0],
      displayThumbs: thumbsToRender,
    });
  }

  handleScreenResize() {
    const { thumbDirection, photoList } = this.state;
    const windowWidth = window.innerWidth;

    if (thumbDirection === 'row') {
      // calculate how many thumbs to render
      if (windowWidth > 650) {
        this.setState({
          thumbDirection: 'column',
        }, this.updatePhotoState(photoList, 6));
      } else {
        const numThumbs = Math.floor((windowWidth - 150) / 74);
        // this.setState({
        //   displayThumbs: numThumbs,
        // });
        this.updatePhotoState(photoList, (numThumbs > 5 ? 5 : numThumbs));
      }
    } else if (windowWidth < 650) {
      this.setState({
        thumbDirection: 'row',
      });
    }
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
      prevPhotos, currentPhotos, nextPhotos,
    } = this.state;

    const { photoList, displayThumbs } = this.state;

    // check to see if at the beginning of photo list
    const firstPhotoIndex = photoList.indexOf(currentPhotos[0]);

    if (firstPhotoIndex !== 0) {
      // not at the beginning, so backtrack
      nextPhotos = currentPhotos.slice();
      currentPhotos = prevPhotos.slice();
      prevPhotos = photoList.slice(firstPhotoIndex - (displayThumbs + 1), firstPhotoIndex - 1);

      this.setState({
        prevPhotos,
        currentPhotos,
        nextPhotos,
      });
    }
  }

  handleNextClick() {
    let {
      prevPhotos, currentPhotos, nextPhotos,
    } = this.state;

    const { photoList, displayThumbs } = this.state;

    const lastPhotoIndex = photoList.indexOf(currentPhotos[currentPhotos.length - 1]);
    // check if at end of photoList

    if (photoList.length - 1 > lastPhotoIndex) {
      // still more photos
      prevPhotos = currentPhotos.slice();
      currentPhotos = nextPhotos.slice(0, displayThumbs);

      const nextPhotoIndex = photoList.indexOf(currentPhotos[currentPhotos.length - 1]);
      nextPhotos = photoList.slice(nextPhotoIndex + 1, nextPhotoIndex + (displayThumbs + 1));
      this.setState({
        prevPhotos,
        currentPhotos,
        nextPhotos,
      });
    }
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
      currentPhotos,
      nextPhotos,
      prevPhotos,
      mainPhoto,
      activeThumb,
      thumbDirection,
    } = this.state;
    return (
      <>
        <Container>
          <Prev
            handleClick={this.handlePrevClick}
            photos={prevPhotos.length}
          />
          <PhotoList
            photos={currentPhotos}
            activeThumb={activeThumb}
            onMouseOver={this.handleThumbnailMouseOver}
            thumbDirection={thumbDirection}
          />
          <MainPhoto
            photo={mainPhoto}
            nextClick={this.handleZoomNextClick}
            prevClick={this.handleZoomPrevClick}
          />
          <Zoom />
          <Next
            nextPhotos={nextPhotos.length}
            handleClick={this.handleNextClick}
          />
        </Container>
      </>
    );
  }
}
