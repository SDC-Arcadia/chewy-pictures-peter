import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import PhotoList from './PhotoList';
import MainPhoto from './MainPhoto';

const Container = styled.div`
  box-sizing: border-box;
  float:left;
  position:relative;
  border: 5px solid red;
`;

const MediaWrapper = styled.div`
  display: inline-block;
  height: 500px;
  border: 5px solid purple;
`;

const MainPhotoWrapper = styled.div`
  border: 5px solid yellow;
  display: inline-block;
  padding-top: 50px;
  padding-bottom: 50px;
  box-size: border-box;
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

    axios.get(`/photos/${productId}`)
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

  render() {
    const { photoList, mainPhoto, activeThumb } = this.state;
    return (
      <Container>

        <MediaWrapper>
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
        </MediaWrapper>
      </Container>
    );
  }
}

Photos.propTypes = {
  productId: PropTypes.string.isRequired,
};
