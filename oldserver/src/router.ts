import * as core from "express-serve-static-core";
import ShirtController from "./controllers/v1/shirt.controller";
import RequestValidator from "./validations/v1/requestValidator.validation";
import PersonController from "./controllers/v1/person.controller";
import AddressController from "./controllers/v1/address.controller";
const cors = require('cors');

export default class Router {

	private server: core.Express;
	private shirtController: ShirtController;
	private personController: PersonController;
	private requestValidator: RequestValidator;
	private addressController: AddressController;

	constructor(server: core.Express) {
		this.server = server;
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
		this.server.route('/v1/shirts')
			.get(cors(), this.shirtController.get)
			.post(cors(), this.requestValidator.shirtValidator('create'), this.shirtController.create);
		this.server.route('/v1/shirts/distinct')
			.get(cors(), this.shirtController.getDistinct);
		this.server.route('/v1/shirts/:url')
			.get(cors(), this.requestValidator.shirtValidator('getbyurl'), this.shirtController.getByUrl)
	}

	private makePeopleRoutes = (): void => {
		this.server.route('/v1/people')
			.post(cors(), this.requestValidator.personValidator('create'), this.personController.create);
		this.server.route('/v1/people/:id')
			.get(cors(), this.requestValidator.personValidator('get-by-id'), this.personController.getById);
		this.server.route('/v1/people/lazy')
			.post(cors(), this.requestValidator.personValidator('lazy'), this.personController.lazyCreate);
		this.server.route('/v1/people/auth')
			.post(cors(), this.requestValidator.personValidator('auth'), this.personController.auth);
		this.server.route('/v1/people/login')
			.post(cors(), this.requestValidator.personValidator('login'), this.personController.login)
		this.server.route('/v1/people/confirm-email')
			.post(cors(), this.requestValidator.personValidator('confirm-email'), this.personController.confirmEmail);
		this.server.route('/v1/people/recovery')
			.post(cors(), this.requestValidator.personValidator('recovery-mail'), this.personController.accountRecoveryMail)
			.put(cors(), this.requestValidator.personValidator('recovery-password'), this.personController.accountRecovery);
		this.server.route('/v1/people/recovery/pin')
			.post(cors(), this.requestValidator.personValidator('recovery-pin'), this.personController.verifyRecoveryPin)
	}

	private makeAddressRoutes = (): void => {
		this.server.route('/v1/addresses')
			.post(cors(), this.requestValidator.addressValidator('create'), this.addressController.create);
		this.server.route('/v1/addresses/:id')
			.get(cors(), this.requestValidator.addressValidator('getbyid'), this.addressController.getById)
	}

}