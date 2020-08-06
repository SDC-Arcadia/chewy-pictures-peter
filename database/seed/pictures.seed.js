const sprintf = require('sprintf-js').sprintf;
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


const pictureSchema = new Schema({
  productId: String,
  images: [{ imgId: String }]
}, { collection: 'Pictures'});

const Picture = mongoose.model('Picture', pictureSchema);

//build array of data to insert into db
const pictureData = [];

let imgNum = 1;

for (let i = 1; i <= 101; i++) {
  let obj = {};
  obj.productId = `P${sprintf('%03d', i)}`;
  obj.images = [];

  for (let j = 0; j < 5; j++) {
    let num = sprintf('%03d', imgNum);
    obj.images.push({imgId: `img${num}.jpeg`})
    imgNum++;
  }
  pictureData.push(obj);
}

//insert the data into the db
Picture.insertMany(pictureData, function(error, docs) {
  if (error) {
    console.log('error inserting into db:', error);
  } else {
    console.log('documents inserted:');
  }
})