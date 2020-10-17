/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');
const eventStream = require('event-stream');

const {
  Picture,
  ProductImage,
  ReviewImage,
  emptyCollection,
} = require('../mongodbConnection.js');

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

    // eslint-disable-next-line no-underscore-dangle
    if (document._id % 100000 === 0) {
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
