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
          A.gender, 
          A.size_pp, 
          A.size_p, 
          A.size_m, 
          A.size_g, 
          A.size_gg 
          from tops AS A inner join categories AS B 
          on A.category_id = B.id`,
        (error, results) => {
          connection.release();
          console.log(results);
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  },
  getImages: () => {
    return new Promise(async (resolve, reject) => {
      const connection = await mySqlPool.mySqlConnection();
      connection.query(
        `select top_id, url from top_images`,
        (error, results) => {
          connection.release();
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
};
