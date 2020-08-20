import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PhotoList from './PhotoList';
import MainPhoto from './MainPhoto';
import Prev from './Prev';
import Next from './Next';
import Zoom from './Zoom';

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
    };

    this.handleThumbnailMouseOver = this.handleThumbnailMouseOver.bind(this);
  }

  componentDidMount() {
    // initial product was passed as props.product
    // fetch photos for that product and update state
    const { productId } = this.props;
    // eslint-disable-next-line no-undef
    fetch(`/photos/${productId}`)
      .then((response) => response.json())
      .then((responseData) => {
        // Determine if fetch returned an error, if so, throw it
        if (responseData.error) {
          throw Error(responseData.error);
        }
        // add images in response data to array and set state
        const imgArray = responseData.image_urls.slice();

        this.setState({
          photoList: imgArray,
          mainPhoto: imgArray[0],
          activeThumb: imgArray[0],
        });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('Error Fetching Product Images:', err));
  }

  handleThumbnailMouseOver(e) {
    const updatedImg = e.target.src;
    this.setState({
      mainPhoto: updatedImg,
      activeThumb: updatedImg,
    });
  }

  render() {
    const { photoList, mainPhoto, activeThumb } = this.state;
    return (
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
          />
        </MainPhotoWrapper>
        <Zoom />
        <Next />
      </Container>
    );
  }
}

Photos.propTypes = {
  productId: PropTypes.string.isRequired,
};
