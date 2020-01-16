import * as core from "express-serve-static-core";
import ShirtController from "./controllers/v1/shirt.controller";
import RequestValidator from "./validations/v1/requestValidator.validation";
import PersonController from "./controllers/v1/person.controller";
import AddressController from "./controllers/v1/address.controller";
const cors = require('cors')

export default class Router {

	private app: core.Express;
	private shirtController: ShirtController;
	private personController: PersonController;
	private requestValidator: RequestValidator;
	private addressController: AddressController;

	constructor(app: core.Express) {
		this.app = app;
		this.shirtController = new ShirtController();
		this.personController = new PersonController();
		this.addressController = new AddressController();
		this.requestValidator = new RequestValidator();
	}

	public initializeRoutes = (): void => {
		this.makeShirtRoutes();
		this.makePeopleRoutes();
		this.makeAddressRoutes();
	}

	private makeShirtRoutes = (): void => {
		this.app.route('/shirts')
			.get(cors(), this.shirtController.get)
			.post(cors(), this.requestValidator.shirtValidator('create'), this.shirtController.create);
		this.app.route('/shirts/:url')
			.get(cors(), this.requestValidator.shirtValidator('getbyurl'), this.shirtController.getByUrl)
	}

	private makePeopleRoutes = (): void => {
		this.app.route('/persons')
			.post(cors(), this.requestValidator.personValidator('create'), this.personController.create)
		this.app.route('/persons/auth')
			.post(cors(), this.requestValidator.personValidator('auth'), this.personController.login)
	}

	private makeAddressRoutes = (): void => {
		this.app.route('/addresses')
			.post(cors(), this.requestValidator.addressValidator('create'), this.addressController.create);
		this.app.route('/addresses/:id')
			.get(cors(), this.requestValidator.addressValidator('getbyid'), this.addressController.getById)
	}

}