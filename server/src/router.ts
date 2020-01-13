import * as core from "express-serve-static-core";
import ShirtController from "./controllers/v1/shirt.controller";
import RequestValidator from "./validations/v1/requestValidator.validation";
const cors = require('cors')

export default class Router {

	private app: core.Express;
	private shirtController: ShirtController;
	private requestValidator: RequestValidator;

	constructor(app: core.Express) {
			this.app = app;
			this.shirtController = new ShirtController();
			this.requestValidator = new RequestValidator();
	}

	public initializeRoutes = () => {
		this.shirtsRoutes();
	}

	private shirtsRoutes = () => {
		this.app.route('/shirts')
			.get(cors(), this.shirtController.get)
			.post(cors(), this.requestValidator.shirtValidator('create'), this.shirtController.create)
	}

}