
const { sprintf}  = require('sprintf-js');
const { db, Picture } = require('../dbConnection.js');



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
    console.log('documents inserted');
    db.close();
  }
})