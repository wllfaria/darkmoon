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
		this.app.route('/shirts/distinct')
			.get(cors(), this.shirtController.getDistinct);
		this.app.route('/shirts/:url')
			.get(cors(), this.requestValidator.shirtValidator('getbyurl'), this.shirtController.getByUrl)
	}

	private makePeopleRoutes = (): void => {
		this.app.route('/people')
			.post(cors(), this.requestValidator.personValidator('create'), this.personController.create);
		this.app.route('/people/lazy')
			.post(cors(), this.requestValidator.personValidator('lazy'), this.personController.lazyCreate);
		this.app.route('/people/auth')
			.post(cors(), this.requestValidator.personValidator('auth'), this.personController.login);
		this.app.route('/people/confirm-email')
			.post(cors(), this.requestValidator.personValidator('confirm-email'), this.personController.confirmEmail);
		this.app.route('/people/recovery')
			.get(cors(), this.requestValidator.personValidator('recovery-pin'), this.personController.verifyRecoveryPin)
			.post(cors(), this.requestValidator.personValidator('recovery-mail'), this.personController.accountRecoveryMail)
			.put(cors(), this.requestValidator.personValidator('recovery-password'), this.personController.accountRecovery);
	}

	private makeAddressRoutes = (): void => {
		this.app.route('/addresses')
			.post(cors(), this.requestValidator.addressValidator('create'), this.addressController.create);
		this.app.route('/addresses/:id')
			.get(cors(), this.requestValidator.addressValidator('getbyid'), this.addressController.getById)
	}

}