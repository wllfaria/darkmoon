const TopsController = require("./controllers/tops.controller");

exports.initializeRoutes = server => {
  server
    .route("/tops")
    .get(TopsController.getAll)
    .post(TopsController.create)
    .put(TopsController.update)
    .delete(TopsController.disable);
  server.route("/tops/:id").get(TopsController.getById);
  server.route("/tops/url/:url").get(TopsController.getByUrl);
  server.route("/tops/images/all").get(TopsController.getImages);
  server.route("/tops/images/:id").get(TopsController.getImagesByTopId);
  server.route("/tops/arrivals").get(TopsController.getArrivals);
  server.route("/tops/arrivals/images").get(TopsController.getArrivalsImages);
  server.route("/tops/:page/:size").get(TopsController.getByPage);
};
