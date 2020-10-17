const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression'); 
const { queryProduct } = require('../database/mongodbConnection.js');
const {
  getPictures,
  createPictures,
  updatePicture,
  deletePicture,
  buildApiResponse,
} = require('./crudApi.js');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(compression());
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../public')));

// Need to refactor database completely to reduce database processes
app.get('/photos/:productId', getPictures);
app.post('/photos/:productId', createPictures);
app.delete('/photos/:productId/:pictureId', deletePicture);
app.put('/photos/:productId/:pictureId', updatePicture);

// review photos crud endpoints

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
