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

// create CSV file for data to insert into db

const generateCSV = async function generateCSVImagesFromS3(fileName, imageKey) {
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
    let imageCollection = '';
    for (let i = 1; i <= 100000; i += 1) {
      const pictureCount = Math.floor(Math.random() * 5) + 3
      
      for (let imageIndex = 1; imageIndex <= pictureCount; imageIndex += 1) {
        const randomImageIndex = Math.floor(Math.random() * 1000);
        const randomImageKey = s3request.Contents[randomImageIndex].Key;
        const randomImageLink = `${s3ImgUrlBase}${randomImageKey}`;
        const productId = i + (batch * 100000)

        imageCount += 1; 

        imageCollection += `${imageCount},${productId},${randomImageLink}\n`;
      }
    }
    
    if (batch === 0) {
      const csvImageCollection = `_id,product_id,${imageKey}\n${imageCollection}`;
      await fsPromises.writeFile(newFilePath, csvImageCollection);
    } else {
      const csvImageCollection = imageCollection
      await fsPromises.appendFile(newFilePath, csvImageCollection);
    }
  }
}

generateCSV('postgresProductPictures.csv', 'image_url');
