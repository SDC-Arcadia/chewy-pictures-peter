const { ReviewImage } = require('../database/mongodbConnection.js');

const {
  getPictures,
  createPictures,
  updatePicture,
  deletePicture,
} = require('./crudApi.js');

exports.getReviewPictures = function getReviewPictureFromDatabase(req, res) {
  getPictures(req, res, ReviewImage, 'review_url');
};

exports.createReviewPictures = function createReviewPictureFromDatabase(req, res) {
  createPictures(req, res, ReviewImage, 'review_url');
};

exports.updateReviewPicture = function updateReviewPictureFromDatabase(req, res) {
  updatePicture(req, res, ReviewImage, 'review_url');
};

exports.deleteReviewPicture = function deleteReviewPictureFromDatabase(req, res) {
  deletePicture(req, res, ReviewImage);
};
