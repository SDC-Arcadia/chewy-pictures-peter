import React from 'react';
import S3_URL from '../lib/s3.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  height: 100vh;
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
    "down zoom"
`;

const Thumbnails = styled.div`
  background: yellow;
  grid-area: thumbs;
`;

const Photo = styled.div`
  background: green;
  grid-area: main;

`;

export default class Photos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoList: [],
      mainPhoto: ''
    };

  }

  componentDidMount() {
    //initial product was passed as props.product
    //fetch photos for that product and update state
    const productId = this.props.product;

    fetch(`/${productId}`)
      .then(response => response.json())
      .then(responseData => {
        //add images in response data to array and set state
        const imgArray = [];

        responseData.images.map(image => imgArray.push(image['img_id']));

        this.setState({
          photoList: imgArray,
          mainPhoto: imgArray[0]
        });

      })
      .catch(err => console.log('Error Fetching Product Images'));
  }

  render() {
    return (
      <div><h1>APP PLACEHOLDER</h1></div>
    );

  }

}

Photos.propTypes = {
  product: PropTypes.string
};