const TopsModel = require("../models/products.model");
const ErrorValidator = require("../helpers/validations/error.validation");
const ResponseValidator = require("../helpers/validations/response.validation");
const HttpStatus = require("../helpers/status.helper");

module.exports = {
  create: () => {},
  getAll: async (req, res) => {
    try {
      let data = await TopsModel.getAll();
      data.forEach(async (product, index, array) => {
        product['product_type'] = await TopsModel.getProductType(product.product_type)
        product['model'] = await TopsModel.getProductModel(product.model);
        product['gender'] = await TopsModel.getProductGender(product.gender);
        product['images'] = await TopsModel.getImagesBySku(product.sku);
        if(index === array.length - 1) {
          const response = ResponseValidator.successResponse(
            HttpStatus.success.success,
            data
          );
          res.status(response.status).json(response);
        }
      })
    } catch (error) {
      const validatedError = ResponseValidator.errorResponse(
        HttpStatus.serverError.internalError,
        ErrorValidator.databaseErrors.getError
      );
      res.status(validatedError.status).json(validatedError);
    }
  },
  getByUrl: async (req, res) => {
    try {
      const data = await TopsModel.getByUrl(req.params.url);
      const response = ResponseValidator.successResponse(
        HttpStatus.success.success,
        data
      );
      res.status(response.status).json(response);
    } catch (error) {}
  },
  getImages: async (req, res) => {
    try {
      console.log("images");
      const data = await TopsModel.getImages();
      const response = ResponseValidator.successResponse(
        HttpStatus.success.success,
        data
      );
      res.status(response.status).json(response);
    } catch (error) {
      const validatedError = ResponseValidator.errorResponse(
        HttpStatus.serverError.internalError,
        ErrorValidator.databaseErrors.getError
      );
      res.status(validatedError.status).json(validatedError);
    }
  },
  getImagesByTopId: async (req, res) => {
    try {
      console.log(req);
      const data = await TopsModel.getImagesByTopId(req.params.id);
      const response = ResponseValidator.successResponse(
        HttpStatus.success.success,
        data
      );
      res.status(response.status).json(response);
    } catch (error) {
      console.log(error);
    }
  }
};
