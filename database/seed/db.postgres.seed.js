const { sql } = require('../postgresdbConnection');

const seedTable = async function dropCreateAndSeedTables(tableName) {
  let urlColumnName;
  if (tableName === 'ProductImage') {
    urlColumnName = 'image_url';
  } else if (tableName === 'ReviewImage') {
    urlColumnName = 'review_url';
  }

  await sql`
    DROP TABLE IF EXISTS ${tableName}
  `;

  await sql`
   CREATE TABLE IF NOT EXISTS ${tableName} (
     _id INT PRIMARY KEY NOT NULL,
     product_id INT NOT NULL,
     ${urlColumnName}: text
   );
  `;
};

seedTable('ProductImage');
