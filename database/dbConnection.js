const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define db connection, schema and model
mongoose.connect('mongodb://localhost/FEC', {useNewUrlParser: true}, function(error) {
  if (error) {
    console.log('connection error', error);
  } else {
    console.log('db connected');
  }
});

const db = mongoose.connection;


const pictureSchema = new Schema({
  'product_id': String,
  images: [{ 'img_id': String }]
}, { collection: 'Pictures'});

const Picture = mongoose.model('Picture', pictureSchema);

const queryProduct = function (productId, callback) {

  Picture.findOne({ 'product_id': productId }, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log('result of db call for invalid item', result);
      callback(null, result);
    }
  });

};

module.exports.db = db;
module.exports.Picture = Picture;
module.exports.queryProduct = queryProduct;