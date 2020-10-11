/* eslint-disable */
const fs = require('fs')
const AWS = require('./aws.js');

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

// get array of pictures in S3 Bucket
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const s3KeyBase = 'images/product';
const s3Bucket = 'sdc-chewy';
const s3ImgUrlBase = `https://${s3Bucket}.s3-us-west-2.amazonaws.com/`;

// create JSON file for data to insert into db

const generateJSON = async function generateJSONImagesFromS3(numberOfRecords, fileName) {
  const params = {
    Bucket: s3Bucket,
    Prefix: s3KeyBase,
  };

  const s3request = await s3.listObjects(params).promise();
  const imageCollection = [];
  for (let i = 1; i < 10000000; i += 1 ) {
    const pictureCount = Math.floor(Math.random() * 5)



    const randomImageIndex = Math.floor(Math.random() * 1000);
    const randomImageKey = s3request.Contents[randomImageIndex].Key;
    const randomImageLink = `${s3ImgUrlBase}${randomImageKey}`;
    
    const currentRecord = {
      _id: i,
      product_id: i,
      image_url: randomImageLink
    };

    imageCollection.push(currentRecord);
  }

  console.log(imageCollection);
}



generateJSON();







// s3request.then((data) => {
//   // returns array of objects, with s3 objet details
//   // parse out the image info and insert into the database

//   for (let i = 1; i < 101; i += 1) {
//     // build image object with id of P001, P002, etc.- up to P100
//     const obj = {};
//     obj.product_id = i;

//     [['images', 6, 7], ['reviews', 8, 13]].forEach((collection) => {
//       obj[collection[0]] = [];
//       // fill images array with random number (between 6 and 12) of random images from S3
//       numOfImages = collection[1] + Math.floor(Math.random() * collection[2]);
//       for (let j = 0; j < numOfImages; j += 1) {
//         // grab random image from S3 and add it as product image
//         randomImage = Math.floor(1 + Math.random() * 199);
//         imgUrl = `${s3ImgUrlBase}${data.Contents[randomImage].Key}`;
//         obj[collection[0]].push({ img_url: imgUrl });

//       }
//     });
//     pictureData.push(obj);
//   }
//   // eslint-disable-next-line no-console
// }).catch((error) => console.log('s3 error', error));
