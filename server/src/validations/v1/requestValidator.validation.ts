import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

export default class RequestValidator {
  public shirtValidator = (option: string) => {
    switch (option) {
      case 'create':
        return [
          body('productName')
            .exists().withMessage('Product Name doesn\'t exists.')
            .isString().withMessage('Product Name should be a string.')
            .isLength({min: 1}).withMessage('Product Name should not be empty.'),
          body('productUrl')
            .exists().withMessage('Product Url doesn\'t exists.')
            .isString().withMessage('Product Url should be a string.')
            .custom(url => !/\s/.test(url)).withMessage('Product Url should not contain any spaces.')
            .isLength({min: 1}).withMessage('Product Url should not be empty.'),
          body('productType')
            .exists().withMessage('Product Type doesn\'t exists.')
            .isInt().withMessage('Product Type should be an integer.'),
          body('avaliable')
            .exists().withMessage('Avaliable doesn\'t exists.')
            .isBoolean().withMessage('Avaliable should be a boolean.'),
          body('price')
            .exists().withMessage('Price doesn\'t exists.')
            .isFloat().withMessage('Price should be a double.'),
          body('size')
            .exists().withMessage('Size doesn\'t exists.')
            .isString().withMessage('Size should be a string.')
            .isLength({min: 1, max: 2}).withMessage('Size should have between 1 and 2 characters.')
            .isIn(['PP', 'P', 'M', 'G', 'GG']).withMessage('Size isn\'t valid.'),
          body('model')
            .exists().withMessage('Model doesn\'t exists.')
            .isInt().withMessage('Model should be an integer.'),
          body('gender')
            .exists().withMessage('Gender doesn\'t exists.')
            .isInt().withMessage('Gender should be an integer.'),
          body('images')
            .exists().withMessage('Product images does\'t exists.')
            .isArray().withMessage('Product images should be a array.')
            .isLength({ min: 1 }).withMessage('Product should have at least 1 image.'),
          body('images.*.name')
            .exists().withMessage('Image name does\'t exists.')
            .isString().withMessage('Image name should be a string.')
            .isLength({ min: 1 }).withMessage('Image name should have at least 1 character.'),
          body('images.*.alt')
            .exists().withMessage('Image alt does\'t exists.')
            .isString().withMessage('Image alt should be a string.')
            .isLength({ min: 1 }).withMessage('Image alt should have at least 1 character.')
        ]
      default:
        return [
          body()
            .exists().withMessage('Request body doesn\'t exists.')
        ]
    }
  }

  public extractErrors = (req: Request) => {
    const errors = validationResult(req)
    const extractedErrors: any[] = []
    errors.array().map(err => extractedErrors.push(`${err.msg} at param: ${err.param ? err.param : 'undefined'} with value: ${err.value}`))
    return extractedErrors;
  }

  public validate = (errors: any, res: Response) => {
    res.status(400).json({
      ok: false,
      errors
    })
  }
}