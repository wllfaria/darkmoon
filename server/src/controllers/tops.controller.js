const TopsModel = require("../models/tops.model");
const ErrorValidator = require("../helpers/validations/error.validation");
const ResponseValidator = require("../helpers/validations/response.validation");
const HttpStatus = require("../helpers/status.helper");

module.exports = {
  create: () => {},
  getAll: async (req, res) => {
    try {
      const data = await TopsModel.getAll();
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
  getByPage: (req, res) => {
    try {
    } catch (error) {}
  },
  getById: () => {},
  getArrivals: () => {},
  update: () => {},
  disable: () => {},
  getImages: async (req, res) => {
    try {
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
  getArrivalsImages: () => {}
};
