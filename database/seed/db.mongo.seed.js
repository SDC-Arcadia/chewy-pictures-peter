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
        console.log(docs);
      });
    }
  }));
};

seedImages(path.join(__dirname, 'reviewPictures.json'), ReviewImage);

// mongoimport --db chewyPictures --collection productimages --file productPictures.csv --type csv --headerline
// mongoimport --db chewyPictures --collection reviewimages --file reviewPictures.csv --type csv --headerline
