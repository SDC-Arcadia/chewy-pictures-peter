const mongoose = require('mongoose');

const { Schema } = mongoose;

// define db connection, schema and model
// mongodb://localhost/FEC'
// mongodb://mongo-db/FEC

// const awsFec = 'mongodb://mongo-db/FEC';
const localSDC = 'mongodb://localhost:27017/chewyPictures';

// peter: made updates to this next line. need to resolve
mongoose.connect(localSDC, { useNewUrlParser: true }, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('connection error', error);
  } else {
    // eslint-disable-next-line no-console
    console.log('db connected');
  }
});

const db = mongoose.connection;

// Original schema with nested subdocuments
// n is much smaller here, but requires multiple network request
const pictureSchema = new Schema({
  product_id: { type: String, index: true, unique: true },
  images: [{ img_url: String }],
  reviews: [{ img_url: String }],
}, { collection: 'Pictures' });

const Picture = mongoose.model('Picture', pictureSchema);

// New schema without nested subdocuments
// n much larger, but requires only 1 network request
const productImageSchema = new Schema({
  _id: String,
  product_id: { type: String, index: true },
  image_url: String,
});

const ProductImage = mongoose.model('ProductImage', productImageSchema);

const reviewImageSchema = new Schema({
  _id: String,
  product_id: { type: String, index: true },
  review_url: String,
});

const ReviewImage = mongoose.model('ReviewImage', reviewImageSchema);

const queryProduct = (productId, callback) => {
  Picture.findOne({ product_id: productId }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const emptyCollection = (model, callback) => {
  model.deleteMany({}, (err) => {
    if (err) {
      callback(err);
    }
  });
};

module.exports.db = db;
module.exports.Picture = Picture;
module.exports.ProductImage = ProductImage;
module.exports.ReviewImage = ReviewImage;
module.exports.queryProduct = queryProduct;
module.exports.emptyCollection = emptyCollection;
