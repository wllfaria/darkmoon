const mySqlPool = require("../mySql");

module.exports = {
  getAll: () => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select 
          B.product_name, 
          B.product_url,
          A.sku,
          A.color, 
          A.price, 
          A.size,
          B.product_type,
          A.model,
          A.gender
          from shirts AS A inner join skus AS B
          on A.sku = B.id`,
        (error, results) => {
          connection.release();
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  },
  getByUrl: productUrl => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select 
        B.product_name, 
        B.product_url,
        A.sku,
        A.color, 
        A.price, 
        A.size,
        B.product_type,
        A.model,
        A.gender
        from shirts AS A inner join skus AS B
        on A.sku = B.id
        where B.product_url = ?`,
        productUrl,
        (error, results) => {
          connection.release();
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  },
  getProductType: productType => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select
          id,
          name
          from product_types
          where id = ?
        `,
        productType,
        (error, result) => {
          connection.release();
          if (error) reject(error);
          resolve(result[0]);
        }
      );
    });
  },
  getProductModel: productModel => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select
          id,
          name
          from models
          where id = ?
        `,
        productModel,
        (error, result) => {
          connection.release();
          if (error) reject(error);
          resolve(result[0]);
        }
      );
    });
  },
  getProductGender: productGender => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select
          id,
          name
          from genders
          where id = ?
        `,
        productGender,
        (error, result) => {
          if (error) reject(error);
          resolve(result[0]);
        }
      );
    });
  },
  getImagesBySku: productSku => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select
          url,
          alt
          from product_images
          where product_sku = ?
        `,
        productSku,
        (error, results) => {
          connection.release();
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
};
