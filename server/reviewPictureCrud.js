// app.post('/review-photos/:productId', async (req, res) => {
//   const {images} = req.body;
//   const {productId: product_id} = req.params;
//   let currentProduct;

//   // find product
//   try {
//     currentProduct = await Picture.find({product_id});
//   } catch {
//     res.status('404');
//     res.send('Product does not exist.')
//     res.end();
//   }

//   const {reviews: previousImages} = currentProduct;
//   const finalImages = previousImages.concat(images);

//   // add picture to product's picture array
//   try {
//     await Picture.update({product_id}, {reviews: finalImages})
//     res.status('200');
//     res.send('Success!');
//     res.end();
//   } catch {
//     console.log('Had trouble posting these pictures.');
//     res.sendStatus('404')
//     res.end();
//   }
// });

// app.delete('/review-photos/:productId/:pictureId', async (req, res) => {
//   const {productId: product_id, pictureId} = req.params;
//   let currentProduct;

//   // find the product
//   try {
//     currentProduct = await Picture.find({product_id});
//   } catch {
//     res.status('404');
//     res.send('Product does not exist')
//     res.end();
//   }

//   // remove the picture
//   const {reviews} = currentProduct;
//   reviews.splice(pictureId, 1);

//   // update the db with the removed picture
//   try {
//     await Picture.update({product_id}, {reviews})
//     res.status('200');
//     res.send('Success!');
//     res.end();
//   } catch {
//     console.log('Had trouble posting these pictures.');
//     res.sendStatus('404')
//     res.end();
//   }
// });

// app.put('/review-photos/:productId/:pictureId', async (req, res) => {
//   // only one picture will be entered
//   const {images} = req.body;
//   const {productId: product_id, pictureId} = req.params;
//   let currentProduct;

//   // find the product
//   try {
//     currentProduct = await Picture.find({product_id});
//   } catch {
//     res.status('404');
//     res.send('Product does not exist.')
//     res.end();
//   }

//   // replace the picture
//   const {reviews} = currentProduct;
//   reviews.splice(pictureId, 1, images);

//   // update the db with the removed picture
//   try {
//     await Picture.update({product_id}, {reviews})
//     res.status('200');
//     res.send('Success!');
//     res.end();
//   } catch {
//     console.log('Had trouble updating this picture.');
//     res.sendStatus('404')
//     res.end();
//   }
// });
