// const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const {
  getProductPictures,
  createProductPictures,
  updateProductPicture,
  deleteProductPicture,
} = require('./productPictureCrud');

const {
  getReviewPictures,
  createReviewPictures,
  updateReviewPicture,
  deleteReviewPicture,
} = require('./reviewPictureCrud');

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(compression());
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../public')));

// product image crud endpoints
app.get('/photos/:productId', getProductPictures);
app.post('/photos/:productId', createProductPictures);
app.delete('/photos/:productId/:pictureId', deleteProductPicture);
app.patch('/photos/:productId/:pictureId', updateProductPicture);

// review image crud endpoints
app.get('/review-photos/:productId', getReviewPictures);
app.post('/review-photos/:productId', createReviewPictures);
app.delete('/review-photos/:productId/:pictureId', deleteReviewPicture);
app.patch('/review-photos/:productId/:pictureId', updateReviewPicture);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));
