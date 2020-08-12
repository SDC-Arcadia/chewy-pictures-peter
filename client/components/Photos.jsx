import React from 'react';
import S3_URL from '../lib/s3.js';
import PropTypes from 'prop-types';

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

    fetch(`/photos/${productId}`)
      .then(response => response.json())
      .then(responseData => {
        //add images in response data to array and set state

        const imgArray = responseData.image_urls.slice();

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