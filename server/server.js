const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { queryProduct } = require('../database/dbConnection.js');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public'), {
  maxAge: 5000,
}));

const buildApiResponse = (dbRecord, imgType) => {
  const apiResponse = {};
  apiResponse.product_id = dbRecord.product_id;
  apiResponse.image_urls = [];

  dbRecord[imgType].forEach((image) => {
    apiResponse.image_urls.push(image.img_url);
  });
  return apiResponse;
};

app.get('/photos/:productId', (req, res) => {
  const product = req.params.productId;
  // query db for product
  queryProduct(product, (err, result) => {
    if (err) {
      res.statusCode = 400;
      res.send({ error: err });
    } else if (!result) {
      res.statusCode = 404;
      res.send({ error: 'record not found' });
    } else {
      res.send(buildApiResponse(result, 'images'));
    }
  });
});

app.get('/review-photos/:productId', (req, res) => {
  const product = req.params.productId;
  // query db for product
  queryProduct(product, (err, result) => {
    if (err) {
      res.statusCode = 400;
      res.send({ error: err });
    } else if (!result) {
      res.statusCode = 404;
      res.send({ error: 'record not found' });
    } else {
      res.send(buildApiResponse(result, 'reviews'));
    }
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));
