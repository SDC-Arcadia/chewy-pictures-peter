const postgres = require('postgres');

const sql = postgres('postgres://username:password@host:port/database', {
  host: 'localhost',
  port: '5432',
  database: 'chewy_images',
  // update this to use an environment variable if using in production
  password: 'password',
  connection: {
    application_name: 'chewyPictures.js',
  },
});

const createTables = async function createProductAndReviewImageTables() {
  await sql`
     CREATE TABLE IF NOT EXISTS ProductImage (
       _id INT PRIMARY KEY NOT NULL,
       product_id INT NOT NULL,
       image_url: text
     );
    `;
  await sql`
     CREATE TABLE IF NOT EXISTS ReviewImage(
      _id INT PRIMARY KEY NOT NULL,
      product_id INT NOT NULL,
      review_url: text
     );
    `;
};

createTables();

// need to update this to return a promise for usage in server layer
exports.findOneProductsImage = async function findProductImagesFromOneProduct(productId) {
  const result = await sql`
    SELECT *
    FROM 

    WHERE product_id = ${productId}
  `;

  return result;
};

exports.sql = sql;
