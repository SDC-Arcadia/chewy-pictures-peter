const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

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
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(compression());
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../public')));

// Need to refactor database completely to reduce database processes
app.get('/photos/:productId', getProductPictures);
app.post('/photos/:productId', createProductPictures);
app.delete('/photos/:productId/:pictureId', deleteProductPicture);
app.patch('/photos/:productId/:pictureId', updateProductPicture);

// review photos crud endpoints

// app.get('/review-photos/:productId', (req, res) => {
//   const product = req.params.productId;
//   // query db for product
//   queryProduct(product, (err, result) => {
//     if (err) {
//       res.statusCode = 400;
//       res.send({ error: err });
//     } else if (!result) {
//       res.statusCode = 404;
//       res.send({ error: 'record not found' });
//     } else {
//       res.send(buildApiResponse(result, 'reviews'));
//     }
//   });
// });

app.get('/review-photos/:productId', getReviewPictures);
app.post('/review-photos/:productId', createReviewPictures);
app.delete('/review-photos/:productId/:pictureId', deleteReviewPicture);
app.patch('/review-photos/:productId/:pictureId', updateReviewPicture);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));
