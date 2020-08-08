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

    fetch(`${S3_URL}/${productId}`)
      .then(response => response.json())
      .then(response_data => console.log('photo service response:', response_data));
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