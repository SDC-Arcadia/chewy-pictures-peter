const { Picture } = require('../database/dbConnection.js');

exports.buildApiResponse = (dbRecord, imgType) => {
  const apiResponse = {};
  apiResponse.product_id = dbRecord.product_id;
  apiResponse.image_urls = [];

  dbRecord[imgType].forEach((image) => {
    apiResponse.image_urls.push(image.img_url);
  });
  return apiResponse;
};

// generalizing get request to support reviews AND images
// exports.get = async function getPictures(req, res, target) {
//   const { productId } = req.params;
//   try {
//     // const result = await Picture.findOne({ product_id: productId }).exec();
//     const result = await Picture.findOne({ [product_id]: productId}).exec();
//     console.log(result);
//     res.status(200)
//     res.send(buildApiResponse(result, target));
//     res.end();
//   } catch {
//     res.status(404);
//     res.end();
//   }
// }

// Retrieves all pictures from the database
exports.getPictures = async function getPicturesFromDatabase(req, res) {
  const { productId } = req.params;
  try {
    // const result = await Picture.findOne({ product_id: productId }).exec();
    const result = await Picture.findOne({ product_id: productId}).exec();
    console.log(result);
    res.status(200)
    res.send(buildApiResponse(result, 'images'));
    res.end();
  } catch {
    res.status(404);
    res.end();
  }
};

// Inserts 1 picture into the database
exports.createPictures = async function createPicturesInDatabase(req, res) {
  const {newImageLink} = req.body;
  const {productId} = req.params;
  let currentProduct;

  // find product
  try {
    currentProduct = await Picture.findOne({ product_id: productId}).exec();
  } catch {
    res.status('404');
    res.send('Product does not exist.')
    res.end();
  }

  const {images} = currentProduct;
  images.push({img_url: newImageLink});

  // add picture to product's picture array
  try {
    await Picture.updateOne({product_id: productId}, {images})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble posting these pictures.');
    res.sendStatus('404')
    res.end();
  }
};

// Updates one picture
exports.updatePicture = async function updatePictureInDatabase(req, res) {
  // only one picture will be entered
  const {newImageLink} = req.body;
  const {productId, pictureId} = req.params;
  let currentProduct;

  // find the product
  try {
    currentProduct = await Picture.findOne({product_id: productId});
  } catch {
    res.status('404');
    res.send('Product does not exist.')
    res.end();
  }

  // replace the picture
  const {images: imageLinks} = currentProduct;
  imageLinks.splice(pictureId, 1, {img_url: newImageLink});
  console.log(imageLinks);

  // update the db with the removed picture
  try {
    await Picture.updateOne({product_id: productId}, {images: imageLinks})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble updating this picture.');
    res.sendStatus('404')
    res.end();
  }
};

// Deletes one picture
exports.deletePicture = async function deletePictureFromDatabase(req, res) {
  const {productId, pictureId} = req.params;
  let currentProduct;

  // find the product
  try {
    currentProduct = await Picture.findOne({product_id: productId});
  } catch {
    res.status('404');
    res.send('Product does not exist')
    res.end();
  }

  // remove the picture
  const {images: imageLinks} = currentProduct;
  imageLinks.splice(pictureId, 1);

  // update the db with the removed picture
  try {
    await Picture.updateOne({product_id: productId}, {images: imageLinks})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble deleting this picture.');
    res.sendStatus('404')
    res.end();
  }
};
