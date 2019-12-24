const mySqlPool = require("../mySql");

module.exports = {
  getAll: () => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select 
          A.id,
          A.code, 
          A.name, 
          A.url,
          A.price, 
          B.name as category, 
          C.model,
          A.gender, 
          A.size_pp, 
          A.size_p, 
          A.size_m, 
          A.size_g, 
          A.size_gg 
          from tops AS A inner join categories AS B 
          on A.category_id = B.id
          inner join models AS C
          on A.model_id = C.id`,
        (error, results) => {
          connection.release();
          console.log(results);
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
          A.id,
          A.code, 
          A.name, 
          A.url,
          A.price, 
          B.name as category, 
          C.model,
          A.gender, 
          A.size_pp, 
          A.size_p, 
          A.size_m, 
          A.size_g, 
          A.size_gg 
          from tops AS A inner join categories AS B 
          on A.category_id = B.id
          inner join models AS C
          on A.model_id = C.id
          where A.url = ?`,
        productUrl,
        (error, results) => {
          connection.release();
          if (error) reject(error);
          resolve(results[0]);
        }
      );
    });
  },
  getImages: () => {
    console.log("getting");
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select top_id, url from top_images`,
        (error, results) => {
          connection.release();
          console.log(results);
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  },
  getImagesByTopId: id => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select top_id, url from top_images where top_id = ?`,
        id,
        (error, results) => {
          connection.release();
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
};
