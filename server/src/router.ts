import * as core from "express-serve-static-core";
import ShirtController from "./controllers/v1/shirt.controller";
import RequestValidator from "./validations/v1/requestValidator.validation";
import PersonController from "./controllers/v1/person.controller";
const cors = require('cors')

export default class Router {

	private app: core.Express;
	private shirtController: ShirtController;
	private personController: PersonController;
	private requestValidator: RequestValidator;

	constructor(app: core.Express) {
			this.app = app;
			this.shirtController = new ShirtController();
			this.personController = new PersonController();
			this.requestValidator = new RequestValidator();
	}

	public initializeRoutes = (): void => {
		this.shirtsRoutes();
		this.peopleRoutes();
	}

	private shirtsRoutes = (): void => {
		this.app.route('/shirts')
			.get(cors(), this.shirtController.get)
			.post(cors(), this.requestValidator.shirtValidator('create'), this.shirtController.create)
	}

	private peopleRoutes = (): void => {
		this.app.route('/people')
			.post(cors(), this.requestValidator.personValidator('create'), this.personController.create)
		this.app.route('/people/lazy')
			.post(cors(), this.requestValidator.personValidator('lazy'), this.personController.lazyCreate);
		this.app.route('/people/auth')
			.post(cors(), this.requestValidator.personValidator('auth'), this.personController.login)
	}

}