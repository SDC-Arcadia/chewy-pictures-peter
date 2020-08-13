import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PhotoList from './PhotoList';
import MainPhoto from './MainPhoto';

const Container = styled.div`
  box-sizing: border-box;
  float:left;
  width:500px;
  height:500px;
  padding-right:30px;
  position:relative;
  border: red;


  ${'' /* display: grid;
  height: 450px;
  position: relative;
  box-sizing: border-box;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: .5fr 6fr .5fr;
  grid-template-areas:
    "up main"
    "thumbs main"
    "thumbs main"
    "thumbs main"
    "thumbs main"
    "thumbs main"
    "thumbs main"
    "down zoom" */}
`;

const Thumbnails = styled.div`
  ${'' /* background: yellow;
  grid-area: thumbs; */}
  box-sizing: border-box;
  width: 100%;
  height: 391px;
  white-space: nowrap;
`;

const Photo = styled.div`
  ${'' /* background: green;
  grid-area: main; */}
  display: table-cell;
  width: 100%;
  height: 400px;
  text-align: center;
  vertical-align: middle;
  position: relative;
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
        <Thumbnails>
          <PhotoList
            photos={photoList}
            activeThumb={activeThumb}
            onMouseOver={this.handleThumbnailMouseOver}
          />
        </Thumbnails>
        <Photo>
          <MainPhoto
            photo={mainPhoto}
          />
        </Photo>
      </Container>
    );
  }
}

Photos.propTypes = {
  productId: PropTypes.string.isRequired,
};
