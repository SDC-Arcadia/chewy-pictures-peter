const express = require('express');
const path = require('path');
const { queryProduct } = require('../database/dbConnection.js');

const app = express();
const PORT = 3004;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

//GET route for photos - returns product object containing img_ids for client to render from AWS bucket
app.get('/:productId', (req, res) => {
  
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
      res.send(result);
    }

  });

});

app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));