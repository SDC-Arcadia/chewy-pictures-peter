const express = require('express');
const path = require('path');
const { queryProduct } = require('../database/dbConnection.js');
const S3_URL = require('./lib/s3.js');

const app = express();
const PORT = 3004;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

//GET route for photos - returns product object containing img_ids for client to render from AWS bucket
app.get('/photos/:productId', (req, res) => {

  let product = req.params.productId;
  console.log('product info requested', product);
  //query db for product
  queryProduct(product, (err, result) => {
    if (err) {
      res.statusCode = 400;
      res.send({ 'error': err });
    } else if (!result) {
      res.statusCode = 404;
      res.send({ 'error': 'record not found' });
    } else {
      res.send(buildApiResponse(result));
    }

  });

});

const buildApiResponse = (dbRecord) => {
  
  const apiResponse = {};
  apiResponse.product_id = dbRecord.product_id;
  apiResponse.image_urls = [];

  dbRecord.images.forEach(image => {
    apiResponse.image_urls.push(S3_URL + image.img_id);
  });

  return apiResponse;
}

app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));