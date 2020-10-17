/*
* Request picture from picture site, stream to s3 bucket using aws-sdk
* Requires s3 creds to be stored in local aws-sdk ini file
* Confirm S3 bucket and permissions are set beforehand
*/

const https = require('https');
const axios = require('axios');
const stream = require('stream');
const Promise = require('promise');
const AWS = require('./aws.js');

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 25,
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const s3KeyBase = 'images/product';
const s3Bucket = 'sdc-chewy';

// Function to get stream from axios, pipe to s3 bucket
const streamToS3 = async (imgNum, width, height) => {
  let contentType = null;
  let s3promise = null;

  // function to upload to S3 using node stream passthrough
  const uploadStream = () => {
    const passThrough = new stream.PassThrough();
    const params = {
      Bucket: s3Bucket,
      Body: passThrough,
      Key: `${s3KeyBase}/img${imgNum}.jpeg`,
      ContentType: contentType,
    };

    s3promise = s3.upload(params).promise();
    return passThrough;
  };

  // function to get picture through axios as a stream, then pipe to uploadStream function
  // eslint-disable-next-line no-unused-vars
  const retrieveStream = axios({
    method: 'get',
    url: `https://picsum.photos/${width}/${height}`,
    responseType: 'stream',
    httpsAgent,
  })
    .then((response) => {
      if (response.status === 200) {
        contentType = response.headers['content-type'];
        response.data.pipe(uploadStream());
      }
    });

  // return promise
  return s3promise;
};

// populate promise array with requests for images of different sizes

const sizeOptions = [300, 400];
let randomWidth = null;
let randomHeight = null;
const s3PromiseArray = [];

for (let i = 1; i <= 1000; i += 1) {
  // generate sizeOptions for picture requst
  randomWidth = sizeOptions[Math.floor(Math.random() * 2)];
  randomHeight = sizeOptions[Math.floor(Math.random() * 2)];
  s3PromiseArray.push(streamToS3(i, randomWidth, randomHeight));
}

// Resolve picture upload stream promises
// Note -- this will return an array of nulls due to scoping & async operations.
// eslint-disable-next-line no-console
Promise.all(s3PromiseArray).then((results) => console.log('promise all results --->', results))
// eslint-disable-next-line no-console
  .catch((error) => console.log('promise all error', error));
