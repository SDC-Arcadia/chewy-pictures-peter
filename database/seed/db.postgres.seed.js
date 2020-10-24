// DO NOT RUN THIS FILE EXCEPT FOR TESTING REASONS
const { sql } = require('../postgresdbConnection');
const path = require('path');

// To Seed the database, run the command below

/* cat postgresProductPictures.csv | psql -h localhost -p 5432 chewy_images -U postgres -c "COPY productimage FROM STDIN WITH DELIMITER ',';" 

cat postgresReviewPictures.csv | psql -h localhost -p 5432 chewy_images -U postgres -c "COPY reviewimage FROM STDIN WITH DELIMITER ',';" 
*/

const seedTable = async function dropCreateAndSeedTables(tableName) {
  let urlColumnName;
  let fileName;
  if (tableName === 'productimage') {
    urlColumnName = 'image_url';
    fileName = 'postgresProductPictures.csv'
  } else if (tableName === 'reviewimage') {
    urlColumnName = 'review_url';
    fileName = 'postgresReviewPictures.csv'
  } else {
    urlColumnName = 'test';
    fileName = 'postgresReviewPictures.csv'
  }

  console.log(tableName);

  try { 
    await sql`
      DROP TABLE IF EXISTS testTable;
    `;
  } catch {
    console.log('error dropping table');
  }
  
  try { 
    await sql`
      CREATE TABLE IF NOT EXISTS testTable (
        _id TEXT PRIMARY KEY NOT NULL,
        product_id TEXT NOT NULL,
        test TEXT
      );
    `;
  } catch {
    console.log('error creating table');
  }

  // try {
  //   await sql`
  //     COPY ${tableName}
  //       FROM ${path.join(__dirname, fileName)};
  //   `;
  // } catch {
  //   console.log('error copying data');
  // }
};

seedTable('testTable');
