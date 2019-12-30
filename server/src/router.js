const TopsController = require("./controllers/products.controller");

exports.initializeRoutes = server => {
  server
    .route("/tops")
    .get(TopsController.getAll)
    .post(TopsController.create)
  server
    .route("/tops/:url")
    .get(TopsController.getByUrl);

};
