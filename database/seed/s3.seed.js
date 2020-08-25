/*
* Request picture from picture site, stream to s3 bucket using aws-sdk
* Requires s3 creds imported - make sure creds are gitignored
*/
const AWS = require('aws-sdk');
//const http = require('http');
//const https = require('https');
const axios = require('axios');
const stream = require('stream');

// const agent = new https.Agent({
//   keepAlive: true,
//   maxSockets: 25,
// });

const credentials = new AWS.SharedIniFileCredentials({ profile: 'rpt22' });
AWS.config.credentials = credentials;
AWS.config.region = 'us-west-1';
//AWS.config.httpOptions = { agent };

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// const s3ListBuckets = s3.listBuckets().promise();

// s3ListBuckets.then((data) => console.log(data))
//   .catch((error) => console.log('error', error.stack));

// get request to picture site, response will be stream
// pipe the stream to s3 upload

const uploadStream = () => {
  const passThrough = new stream.PassThrough();
  const params = {
    Bucket: 'rpt22-fec-kwame',
    Body: passThrough,
    Key: 'images/product/V2/test1.jpeg',
    ContentType: 'application/octet-stream',
  };
  s3.upload(params, (err, data) => {
    console.log(err, data);
  });

 return passThrough;
};

axios({
  method: 'get',
  url: 'https://picsum.photos/300/400',
  responseType: 'stream',
})
.then((response) => response.data.pipe(uploadStream()))

