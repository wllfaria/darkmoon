const TopsController = require("./controllers/tops.controller");

exports.initializeRoutes = server => {
  server
    .route("/tops")
    .get(TopsController.getAll)
    .post(TopsController.create)
    .put(TopsController.update)
    .delete(TopsController.disable);
  server.route("/tops/images").get(TopsController.getImages);
  server.route("/tops/:id").get(TopsController.getById);
  server.route("/tops/arrivals").get(TopsController.getArrivals);
  server.route("/tops/arrivals/images").get(TopsController.getArrivalsImages);
  server.route("/tops/:page/:size").get(TopsController.getByPage);
};
