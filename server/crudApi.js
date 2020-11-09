/* eslint-disable no-underscore-dangle */

exports.buildApiResponse = (productId, dbResultArray, imgType) => {
  const apiResponse = { product_id: productId };

  apiResponse.image_urls = [];
  apiResponse.pictureId = [];

  dbResultArray.forEach((image) => {
    apiResponse.image_urls.push(image[imgType]);
    apiResponse.pictureId.push(image._id);
  });
  return apiResponse;
};

// Retrieves all pictures from the database
exports.getPictures = async function getPicturesFromDatabase(req, res, modelName, imageKey) {
  const { productId } = req.params;
  try {
    const result = await modelName.find({ product_id: productId }).exec();
    res.status(200);
    res.send(exports.buildApiResponse(productId, result, imageKey));
    res.end();
  } catch (error) {
    res.status(404);
    res.send('Could not retrieve these pictures', error);
    res.end();
  }
};

// Inserts 1 picture into the database
exports.createPictures = async function createPicturesInDatabase(req, res, modelName, imageKey) {
  const { newImageLink } = req.body;
  const { productId } = req.params;

  // add picture to product image collection
  try {
    await modelName.create({ product_id: productId, [imageKey]: newImageLink });
    res.status('200');
    res.send('Success!');
    res.end();
  } catch (error) {
    console.log('Had trouble posting these pictures.', error);
    res.sendStatus('404');
    res.end();
  }
};

// Updates one picture
exports.updatePicture = async function updatePictureInDatabase(req, res, modelName, imageKey) {
  // only one picture will be entered
  const { newImageLink } = req.body;
  const { pictureId } = req.params;

  // update the db with the correct picture
  try {
    await modelName.updateOne({ _id: pictureId }, { [imageKey]: newImageLink });
    res.status('200');
    res.send('Success!');
    res.end();
  } catch (error) {
    console.log('Had trouble updating this picture.', error);
    res.sendStatus('404');
    res.end();
  }
};

// Deletes one picture
exports.deletePicture = async function deletePictureFromDatabase(req, res, modelName) {
  const { pictureId } = req.params;

  // delete the single picture
  try {
    await modelName.deleteOne({ _id: pictureId });
    res.status('200');
    res.send('Success!');
    res.end();
  } catch (error) {
    console.log('Had trouble deleting this picture.', error);
    res.sendStatus('404');
    res.end();
  }
};
