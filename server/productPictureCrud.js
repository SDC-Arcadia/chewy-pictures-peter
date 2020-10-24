const { ProductImage } = require('../database/mongodbConnection.js');

const {
  getPictures,
  createPictures,
  updatePicture,
  deletePicture,
} = require('./crudApi.js');

exports.getProductPictures = function getProductPictureFromDatabase(req, res) {
  getPictures(req, res, ProductImage, 'image_url');
};

exports.createProductPictures = function createProductPictureFromDatabase(req, res) {
  createPictures(req, res, ProductImage, 'image_url');
};

exports.updateProductPicture = function updateProductPictureFromDatabase(req, res) {
  updatePicture(req, res, ProductImage, 'image_url');
};

exports.deleteProductPicture = function deleteProductPictureFromDatabase(req, res) {
  deletePicture(req, res, ProductImage);
};
