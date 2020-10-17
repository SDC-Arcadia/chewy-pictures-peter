const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');
const eventStream = require('event-stream');

const fsPromise = fs.promises;
const {
  db,
  Picture,
  ProductImage,
  ReviewImage,
  emptyCollection,
} = require('../dbConnection.js');

// build array of data to insert into db
// const pictureData = [];
// let numOfImages = 0;
// let randomImage = 0;
// let imgUrl = '';

// delete all records from database if exists
// eslint-disable-next-line no-console

const seedImages = function seedImagesIntoMongo(file, modelName) {
  emptyCollection(modelName, (err) => console.log('Error Deleting Collection', err));

  const readStream = fs.createReadStream(file, {
    encoding: 'utf-8',
  });
  const json = readStream.on('data', () => {}).pipe(JSONStream.parse('*'));

  let documentUploadCount = 0;
  let documentBatchArray = [];
  json.pipe(eventStream.map((document) => {
    documentBatchArray.push(document);

    if (documentBatchArray.length % 100000 === 0) {
      modelName.insertMany(documentBatchArray, (error, docs) => {
        if (error) {
          return error;
        }
        documentBatchArray = [];
        documentUploadCount += 100000;
        console.log(docs);
        console.log(`Inserted ${documentUploadCount} documents into database`);
      });
    }
  }));
};

seedImages(path.join(__dirname, 'reviewPictures.json'), ReviewImage);
