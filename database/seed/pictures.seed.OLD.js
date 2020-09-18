const { sprintf } = require('sprintf-js');
const { db, Picture, emptyCollection } = require('../dbConnection.js');
const AWS = require('./aws.js');

// delete all records from database if exists
// eslint-disable-next-line no-console
emptyCollection((err) => console.log('Error Deleting Collection', err));

// get array of pictures in S3 Bucket
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const s3KeyBase = 'images/product/V2';
const s3Bucket = 'rpt22-fec-kwame';
const s3ImgUrlBase = `https://${s3Bucket}.s3-us-west-1.amazonaws.com/`;
// build array of data to insert into db
const pictureData = [];
let numOfImages = 0;
let randomImage = 0;
let imgUrl = '';

const params = {
  Bucket: s3Bucket,
  Prefix: s3KeyBase,
};

const s3request = s3.listObjects(params).promise();
s3request.then((data) => {
  // returns array of objects, with s3 objet details
  // parse out the image info and insert into the database
  for (let i = 1; i < 101; i += 1) {
    // build image object with id of P001, P002, etc.- up to P100
    const obj = {};
    obj.product_id = `P${sprintf('%03d', i)}`;
    obj.images = [];
    // fill images array with random number (between 6 and 12) of random images from S3
    numOfImages = 6 + Math.floor(Math.random() * 7);
    for (let j = 0; j < numOfImages; j += 1) {
      // grab random image from S3 and add it as product image
      randomImage = Math.floor(Math.random() * 199);
      imgUrl = `${s3ImgUrlBase}${data.Contents[randomImage].Key}`;
      obj.images.push({ img_url: imgUrl });
    }
    pictureData.push(obj);
  }
  // after 100 database records have been built, add to database
  Picture.insertMany(pictureData, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('error inserting into db:', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('documents inserted');
      db.close();
    }
  });
  // eslint-disable-next-line no-console
}).catch((error) => console.log('s3 error', error));
