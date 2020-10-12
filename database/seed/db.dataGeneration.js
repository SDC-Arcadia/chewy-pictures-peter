/* eslint-disable */
const fs = require('fs')
const fsPromises = fs.promises;
const AWS = require('./aws.js');
const path = require('path')

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

// get array of pictures in S3 Bucket
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const s3KeyBase = 'images/product';
const s3Bucket = 'sdc-chewy';
const s3ImgUrlBase = `https://${s3Bucket}.s3-us-west-2.amazonaws.com/`;

// create JSON file for data to insert into db

const generateJSON = async function generateJSONImagesFromS3(fileName) {
  const newFilePath = path.join(__dirname, fileName);
  
  const params = {
    Bucket: s3Bucket,
    Prefix: s3KeyBase,
  };

  const s3request = await s3.listObjects(params).promise();

  let imageCount = 0;

  // 100 separate batches
  for (let batch = 0; batch < 100; batch++) {
    // each batch contains 100K products
    const imageCollection = [];
    for (let i = 1; i <= 100000; i +=1) {
      const pictureCount = Math.floor(Math.random() * 5) + 3
      
      for (let imageIndex = 1; imageIndex <= pictureCount; imageIndex += 1) {
        const randomImageIndex = Math.floor(Math.random() * 1000);
        const randomImageKey = s3request.Contents[randomImageIndex].Key;
        const randomImageLink = `${s3ImgUrlBase}${randomImageKey}`;
        const productId = i + (batch * 10)

        imageCount += 1; 

        const currentRecord = {
          _id: imageCount,
          product_id: productId,
          image_url: randomImageLink
        };
        imageCollection.push(currentRecord);
      }
    }
    const jsonImageCollection = JSON.stringify(imageCollection);
  
    if (batch === 0) {
      await fsPromises.writeFile(newFilePath, jsonImageCollection);
    } else {
      await fsPromises.appendFile(newFilePath, jsonImageCollection);
    }
  }
}

generateJSON('productPictures.json');
