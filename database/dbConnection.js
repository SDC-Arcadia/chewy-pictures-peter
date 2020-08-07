const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define db connection, schema and model
mongoose.connect('mongodb://localhost/FEC', {useNewUrlParser: true}, function(error) {
  if (error) {
    console.log('connection error', error);
  } else {
    console.log('db connected')
  }
});

const db = mongoose.connection;


const pictureSchema = new Schema({
  productId: String,
  images: [{ imgId: String }]
}, { collection: 'Pictures'});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports.db = db;
module.exports.Picture = Picture;