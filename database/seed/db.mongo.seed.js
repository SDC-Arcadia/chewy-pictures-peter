// WIP File -- this doesn't do anything yet.

const { db, Picture, emptyCollection } = require('../dbConnection.js');

// build array of data to insert into db
const pictureData = [];
let numOfImages = 0;
let randomImage = 0;
let imgUrl = '';

// delete all records from database if exists
// eslint-disable-next-line no-console
emptyCollection((err) => console.log('Error Deleting Collection', err));

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