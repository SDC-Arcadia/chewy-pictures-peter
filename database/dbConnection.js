const mongoose = require('mongoose');

const { Schema } = mongoose;

// define db connection, schema and model
mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true }, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('connection error', error);
  } else {
    // eslint-disable-next-line no-console
    console.log('db connected');
  }
});

const db = mongoose.connection;

const pictureSchema = new Schema({
  product_id: String,
  images: [{ img_id: String }],
}, { collection: 'Pictures' });

const Picture = mongoose.model('Picture', pictureSchema);

const queryProduct = (productId, callback) => {
  Picture.findOne({ product_id: productId }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports.db = db;
module.exports.Picture = Picture;
module.exports.queryProduct = queryProduct;
