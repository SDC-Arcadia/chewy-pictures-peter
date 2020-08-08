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

module.exports.db = db;
module.exports.Picture = Picture;