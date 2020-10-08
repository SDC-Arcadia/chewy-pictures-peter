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

// To refactor/consider refactoring this picture schema to properly set up images module.
const pictureSchema = new Schema({
  product_id: { type: String, index: true },
  images: [{ img_url: String }],
  reviews: [{ img_url: String }],
}, { collection: 'Pictures' });

const Picture = mongoose.model('Picture', pictureSchema);

// const queryProduct = (productId, callback) => {
//   Picture.findOne({ product_id: productId }, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

const emptyCollection = (callback) => {
  Picture.deleteMany({}, (err) => {
    if (err) {
      callback(err);
    }
  });
};

module.exports.db = db;
module.exports.Picture = Picture;
// module.exports.queryProduct = queryProduct;
module.exports.emptyCollection = emptyCollection;
