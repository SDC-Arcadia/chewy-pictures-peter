const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { queryProduct, Picture } = require('../database/dbConnection.js');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

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

// Need to refactor database completely to shorten API routes

app.post('/photos/:productId', async (req, res) => {
  const {images} = req.body;
  const {productId: product_id} = req.params;
  let currentProduct;

  // find product
  try {
    currentProduct = await Picture.find({product_id});
  } catch {
    res.status('404');
    res.send('Product does not exist.')
    res.end();
  }

  const {images: previousImages} = currentProduct;
  const finalImages = previousImages.concat(images);

  // add picture to product's picture array
  try {
    await Picture.update({product_id}, {images: finalImages})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble posting these pictures.');
    res.sendStatus('404')
    res.end();
  }
});

app.delete('/photos/:productId/:pictureId', async (req, res) => {
  const {productId: product_id, pictureId} = req.params;
  let currentProduct;

  // find the product
  try {
    currentProduct = await Picture.find({product_id});
  } catch {
    res.status('404');
    res.send('Product does not exist')
    res.end();
  }

  // remove the picture
  const {images} = currentProduct;
  images.splice(pictureId, 1);

  // update the db with the removed picture
  try {
    await Picture.update({product_id}, {images})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble posting these pictures.');
    res.sendStatus('404')
    res.end();
  }
});

app.put('/photos/:productId/:pictureId', async (req, res) => {
  // only one picture will be entered
  const {images} = req.body;
  const {productId: product_id, pictureId} = req.params;
  let currentProduct;

  // find the product
  try {
    currentProduct = await Picture.find({product_id});
  } catch {
    res.status('404');
    res.send('Product does not exist.')
    res.end();
  }

  // replace the picture
  const {images: finalImages} = currentProduct;
  finalImages.splice(pictureId, 1, images);

  // update the db with the removed picture
  try {
    await Picture.update({product_id}, {images: finalImages})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble updating this picture.');
    res.sendStatus('404')
    res.end();
  }
});



// review photos crud

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

app.post('/review-photos/:productId', async (req, res) => {
  const {images} = req.body;
  const {productId: product_id} = req.params;
  let currentProduct;

  // find product
  try {
    currentProduct = await Picture.find({product_id});
  } catch {
    res.status('404');
    res.send('Product does not exist.')
    res.end();
  }

  const {reviews: previousImages} = currentProduct;
  const finalImages = previousImages.concat(images);

  // add picture to product's picture array
  try {
    await Picture.update({product_id}, {reviews: finalImages})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble posting these pictures.');
    res.sendStatus('404')
    res.end();
  }
});

app.delete('/review-photos/:productId/:pictureId', async (req, res) => {
  const {productId: product_id, pictureId} = req.params;
  let currentProduct;

  // find the product
  try {
    currentProduct = await Picture.find({product_id});
  } catch {
    res.status('404');
    res.send('Product does not exist')
    res.end();
  }

  // remove the picture
  const {reviews} = currentProduct;
  reviews.splice(pictureId, 1);

  // update the db with the removed picture
  try {
    await Picture.update({product_id}, {reviews})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble posting these pictures.');
    res.sendStatus('404')
    res.end();
  }
});

app.put('/review-photos/:productId/:pictureId', async (req, res) => {
  // only one picture will be entered
  const {images} = req.body;
  const {productId: product_id, pictureId} = req.params;
  let currentProduct;

  // find the product
  try {
    currentProduct = await Picture.find({product_id});
  } catch {
    res.status('404');
    res.send('Product does not exist.')
    res.end();
  }

  // replace the picture
  const {reviews} = currentProduct;
  reviews.splice(pictureId, 1, images);

  // update the db with the removed picture
  try {
    await Picture.update({product_id}, {reviews})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble updating this picture.');
    res.sendStatus('404')
    res.end();
  }
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));
