const { Picture, ProductImage, ReviewImage } = require('../database/dbConnection.js');

exports.buildApiResponse = (dbRecord, imgType) => {
  const apiResponse = {};
  apiResponse.product_id = dbRecord.product_id;
  apiResponse.image_urls = [];

  dbRecord[imgType].forEach((image) => {
    apiResponse.image_urls.push(image.img_url);
  });
  return apiResponse;
};


// Retrieves all pictures from the database
exports.getPictures = async function getPicturesFromDatabase(req, res) {
  const { productId } = req.params;
  try {
    // const result = await Picture.findOne({ product_id: productId }).exec();
    const result = await Picture.findOne({ product_id: productId}).exec();
    console.log(result);
    res.status(200)
    res.send(exports.buildApiResponse(result, 'images'));
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

  // add picture to product image collection
  try {
    await ProductImage.create({product_id: productId, image_url: newImageLink})
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
  const {pictureId} = req.params;
  
  // update the db with the correct picture
  try {
    await ProductImage.updateOne({_id: pictureId}, {image_url: newImageLink})
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
  const {pictureId} = req.params;

  // delete the single picture
  try {
    await ProductImage.deleteOne({_id: pictureId})
    res.status('200');
    res.send('Success!');
    res.end();
  } catch {
    console.log('Had trouble deleting this picture.');
    res.sendStatus('404')
    res.end();
  }
};
