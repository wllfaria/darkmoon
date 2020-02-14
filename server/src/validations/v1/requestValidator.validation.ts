import { body, validationResult, ValidationError, Result, ValidationChain, query, param } from 'express-validator';
import { Request, Response } from 'express';

export default class RequestValidator {
	public shirtValidator = (option: string): ValidationChain[] => {
		switch (option) {
			case 'create': {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
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
			}
			case 'getbyurl': {
				return [
					body('url')
						.exists().withMessage('Product url doesn\'t exists.')
						.isString().withMessage('Product url should be a string.')
						.isLength({ min: 1 }).withMessage('Product url should have at least 1 character.')
				]
			}
			default: {
				return [
					body()
						.exists().withMessage('Request body doesn\'t exists.')
				]
			}
		}
	}

	public personValidator = (option: string): ValidationChain[] => {
		switch(option) {
			case "create": {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
					body('name')
						.exists().withMessage('Name doesn\'t exists.')
						.isString().withMessage('Name should be a string.')
						.custom(name => /\s/.test(name)).withMessage('Name must have at least 1 space.')
						.isLength({ min: 1 }).withMessage('Name should not be empty'),
					body('email')
						.exists().withMessage('Email doesn\'t exists.')
						.isString().withMessage('Email should be a string.')
						.isLength({ min: 1 }).withMessage('Email should not be empty.')
						.custom(email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)).withMessage('Email is invalid.'),
					body('password')
						.exists().withMessage('Password doesn\'t exists.')
						.isString().withMessage('Password should be a string.')
						.isLength({ min: 8 }).withMessage('Password should have at least 8 characters.'),
					body('confirmation')
						.exists().withMessage('Confirmation doesn\'t exists.')
						.isString().withMessage('Confirmation should be a string.')
						.isLength({ min: 8 }).withMessage('Confirmation should have at least 8 characters.')
						.custom((confirmation, { req }) => { if(confirmation === req.body.password) { return confirmation } else { throw new Error('Confirmation must match with the password.') } }),
					body('cpf')
						.exists().withMessage('Cpf doesn\'t exists.')
						.isInt().withMessage('Cpf must contain only numbers.')
						.isLength({ min: 11, max: 11 }).withMessage('Cpf should have 11 characters.')
				]
			}
			case "auth": {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
					body('email')
						.exists().withMessage('Email doesn\'t exists.')
						.isString().withMessage('Email should be a string.')
						.custom(email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)).withMessage('Email is invalid.'),
					body('password')
						.exists().withMessage('Password doesn\'t exists.')
						.isString().withMessage('Password should be a string.')
						.isLength({ min: 8 }).withMessage('Password should have at least 8 characters.')
				]
			}
			case "login": {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
					body('email')
						.exists().withMessage('Email doesn\'t exists.')
						.isString().withMessage('Email should be a string.')
						.custom(email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)).withMessage('Email is invalid.'),
					body('password')
						.exists().withMessage('Password doesn\'t exists.')
						.isString().withMessage('Password should be a string.')
						.isLength({ min: 8 }).withMessage('Password should have at least 8 characters.')
				]
			}
			case "lazy": {
				return [
					body('name')
						.exists().withMessage('Name doesn\'t exists.')
						.isString().withMessage('Name should be a string.')
						.custom(name => /\s/.test(name)).withMessage('Name must have at least 1 space.')
						.isLength({ min: 1 }).withMessage('Name should not be empty'),
					body('email')
						.exists().withMessage('Email doesn\'t exists.')
						.isString().withMessage('Email should be a string.')
						.isLength({ min: 1 }).withMessage('Email should not be empty.')
						.custom(email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)).withMessage('Email is invalid.'),
					body('cpf')
						.exists().withMessage('Cpf doesn\'t exists.')
						.isInt().withMessage('Cpf must contain only numbers.')
						.isLength({ min: 11, max: 11 }).withMessage('Cpf should have 11 characters.'),
					body('address')
						.exists().withMessage('Address doesn\'t exists.')
						.notEmpty().withMessage('Address should not be empty.'),
					body('address.zip_code')
						.exists().withMessage('Zip code doesn\'t exists.')
						.isString().withMessage('Zip code should be a string.')
						.isLength({ min: 1 }).withMessage('Zip code should not be an empty string.'),
					body('address.district')
						.exists().withMessage('District doesn\'t exists.')
						.isString().withMessage('District should be a string.')
						.isLength({ min: 1 }).withMessage('District should not be an empty string.'),
					body('address.neighborhood')
						.exists().withMessage('Neighborhood doesn\'t exists.')
						.isString().withMessage('Neighborhood should be a string.')
						.isLength({ min: 1 }).withMessage('Neighborhood should not be a empty string.'),
					body('address.city')
						.exists().withMessage('City doesn\'t existis.')
						.isString().withMessage('City should be a string.')
						.isLength({ min: 1 }).withMessage('City should not be a empty string.'),
					body('address.state')
						.exists().withMessage('State doesn\'t exists.')
						.isString().withMessage('State should be a string.')
						.isLength({ min: 1 }).withMessage('State shoudl not be a empty string.'),
					body('address.number')
						.exists().withMessage('Number doesn\'t exists.')
						.isString().withMessage('Number should be a string.')
						.isLength({ min: 1 }).withMessage('Number should not be a empty string.'),
					body('addres.complement')
						.optional()
						.isString().withMessage('Complement should be a string.')
						.isLength({ min: 1 }).withMessage('Complement should not be a empty string.'),
					body('card')
						.optional()
						.notEmpty().withMessage('Card should not be empty.'),
					body('card.number')
						.exists().withMessage('Card Number doesn\'t exists.')
						.isString().withMessage('Card Number should be a string')
						.isLength({ min: 1 }).withMessage('Card Number should not be a empty string.'),
					body('card.flag')
						.exists().withMessage('Card Flag doesn\'t exists.')
						.isInt().withMessage('Card Flag should be an integer.'),
					body('card.expiration')
						.exists().withMessage('Card Expiration doesn\'t exists.')
						.custom(expiration => !isNaN(Date.parse(expiration))).withMessage('Expiration should be a date.'),
					body('card.owner')
						.exists().withMessage('Card Owner doesn\'t exists.')
						.isString().withMessage('Card Owner should be a string.')
						.isLength({ min: 1 }).withMessage('Card Owner should not be a empty string.')
				]
			}
			case "confirm-email": {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
					body('guid')
						.exists().withMessage('Guid doesn\'t exists.')
						.isString().withMessage('Guid should be a string.')
						.isUUID(4).withMessage('Guid should be a UUID.')
						.isLength({ min: 1 }).withMessage('Guid should not be a empty string.')
				]
			}
			case "recovery-mail": {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
					body('email')
						.optional()
						.isString().withMessage('Email should be a string.')
						.isLength({ min: 1 }).withMessage('Email should not be empty.')
						.custom(email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)).withMessage('Email is invalid.'),
					body('cpf')
						.optional()
						.isInt().withMessage('Cpf must contain only numbers.')
						.isLength({ min: 11, max: 11 }).withMessage('Cpf should have 11 characters.')
				]
			}
			case "recovery-pin": {
				return [
					query()
						.exists().withMessage('Body doesn\'t exists.'),
					query('pin')
						.exists().withMessage('Pin doesn\'t exists.')
						.isInt().withMessage('Pin must contain only numbers.')
						.isLength({ min: 6, max: 6 }).withMessage('Pin must have only 6 charaters.'),
					query('email')
						.optional()
						.isString().withMessage('Email should be a string.')
						.isLength({ min: 1 }).withMessage('Email should not be empty.')
						.custom(email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)).withMessage('Email is invalid.'),
					query('cpf')
						.optional()
						.isInt().withMessage('Cpf must contain only numbers.')
						.isLength({ min: 11, max: 11 }).withMessage('Cpf should have 11 characters.')
				]
			}
			case "recovery-password": {
				return [
					body()
						.exists().withMessage('Body doesn\'t exists.'),
					body('pin')
						.exists().withMessage('Pin doesn\'t exists.')
						.isInt().withMessage('Pin must contain only numbers.')
						.isLength({ min: 6, max: 6 }).withMessage('Pin must have only 6 charaters.'),
					body('id')
						.exists().withMessage('Id doesn\'t exists.')
						.isInt().withMessage('Id must contain only numbers.')
						.isLength({ min: 1 }).withMessage('Id must have at least 1 charater.'),
					body('password')
						.exists().withMessage('Password doesn\'t exists.')
						.isString().withMessage('Password should be a string.')
						.isLength({ min: 8 }).withMessage('Password should have at least 8 characters.'),
					body('confirmation')
						.exists().withMessage('Confirmation doesn\'t exists.')
						.isString().withMessage('Confirmation should be a string.')
						.isLength({ min: 8 }).withMessage('Confirmation should have at least 8 characters.')
						.custom((confirmation, { req }) => { if(confirmation === req.body.password) { return confirmation } else { throw new Error('Confirmation must match with the password.') } }),
				]
			}
			case "get-by-url": {
				return [
					query()
						.exists().withMessage('Query does\'t exists.'),
					query('id')
						.exists().withMessage('Id doesn\'t exists.')
						.isInt().withMessage('Id should be an integer.')
						.isLength({ min: 1 }).withMessage('Id should have at least 1 number.')
				]
			}
			default: {
				return [
					body()
						.exists().withMessage('Request body doesn\'t exists.')
				]
			}
		}
	}

	public addressValidator = (option: string) => {
		switch (option) {
			case "create": {
				return [
					body().exists().withMessage('Request body doesn\'t exists.'),
					body('zip_code').exists().withMessage('Missing Zip code').isInt().withMessage('Zip code must be numeric'),
					body('district').exists().withMessage('Missing district'),
					body('neighborhood').exists().withMessage('Missing neighborhood'),
					body('city').exists().withMessage('Missing city'),
					body('state').exists().withMessage('Missing state'),
					body('number').exists().withMessage('Missing number').isInt().withMessage('Number must be numeric')
				]
			}
			case "getbyid": {
				return [
					param('id').exists().withMessage('Missing id on query string')
				]
			}
			default: {
				return [
					body().exists().withMessage("Body inexistent.")
				]
			}
		}
	}
	

	public extractErrors = (req: Request): ValidationError[] => {
		const errors: Result<ValidationError> = validationResult(req)
		const extractedErrors: ValidationError[] = []
		errors.array().map((err: ValidationError) => extractedErrors.push({...err}))
		return extractedErrors;
	}
}