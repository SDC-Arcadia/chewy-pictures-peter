
//const { sprintf } = require('sprintf-js');
const fs = require('fs');
const path = require('path');
const request = require('request');
const awsCli = require('aws-cli-js');
// const { db, Picture } = require('../dbConnection.js');
const { accessKey, secretAccessKey } = require('../../client/lib/s3.js');



// build array of data to insert into db
// const pictureData = [];

// let imgNum = 1;

// for (let i = 1; i <= 101; i++) {
//   let obj = {};
//   obj['product_id'] = `P${sprintf('%03d', i)}`;
//   obj.images = [];

//   for (let j = 0; j < 5; j++) {
//     let num = sprintf('%03d', imgNum);
//     obj.images.push({ 'img_id': `img${num}.jpeg` });
//     imgNum++;
//   }

//   pictureData.push(obj);
// }
// //console.log('pic data', pictureData);

// //insert the data into the db
// Picture.insertMany(pictureData, function (error) {
//   if (error) {
//     console.log('error inserting into db:', error);
//   } else {
//     console.log('documents inserted');
//     db.close();
//   }
// });


/* REFACTOR OF DATABASE SEED */

/**
 * Make API call to image service - width options of 300px and 400px, hight options of 300px and 400px
 * pass picture image to aws cli to upload to S3
 * Once all are uploaded, request image urls from S3
 * Randomize with product and insert into DB
**/

//make call to picture api
//get variation of image sizes

const Options = awsCli.Options;
const Aws = awsCli.Aws;

const options = new Options(accessKey, secretAccessKey);
const aws = new Aws(options);

const sizeOptions = [300, 400];

let randomWidth = Math.floor(Math.random() * 2);
let randomHeight = Math.floor(Math.random() * 2);
console.log('random width and height', randomWidth, randomHeight);

// aws.command('s3 ls s3://rpt22-fec-kwame --output json')
//   .then((data) => console.log('data = ', data));

//request(`https://picsum.photos/${sizeOptions[randomWidth]}/${sizeOptions[randomHeight]}`).pipe(fs.createWriteStream(path.join(__dirname, 'BBBBB.jpeg')));

 request(`https://picsum.photos/${sizeOptions[randomWidth]}/${sizeOptions[randomHeight]}`, (error, response, body) => {

//   if (error) {
//     throw new Error(error);
//   }
//   //write file from request to local directory
//   console.log('writing file to local disk');

  fs.writeFile(path.join(__dirname, 'AbbAnnmmAA.jpeg'), body, { encoding: 'binary'}, (error) => {
//     //upload to aws
    if (error) {
      throw new Error(error);
    }
//     console.log('uploading file to S3');
//     aws.command(`s3 cp ${path.join(__dirname, 'AAAAA.jpeg')} s3://rpt22-fec-kwame/images/product/AAAAA.jpeg`, (err, data) => {
//       //delete file from filesystme
//       if (err) {
//         throw new Error(err);
//       }
//       console.log('deleting file from local disk');
//       fs.unlink(path.join(__dirname, 'AAAAA.jpeg'), (error) => {
//         if (error) {
//           throw new Error(error);
//         }
//         console.log('local file deleted');
//       })
//     })

  })
 });