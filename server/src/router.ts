import * as core from "express-serve-static-core";
import ShirtsController from './controllers/shirts.controller';
import EmailsController from "./controllers/emails.controller";
import PersonsController from "./controllers/persons.controller";
const cors = require('cors')

export default class Router {

	private app: core.Express;
	private shirtsController: ShirtsController;
	private emailsController: EmailsController;
	private personsController: PersonsController;

	constructor(app: core.Express) {
			this.app = app;
			this.shirtsController = new ShirtsController();
			this.emailsController = new EmailsController();
			this.personsController = new PersonsController();
	}

	public initializeRoutes() {
		this.shirtsRoutes();
		this.emailsRoutes();
		this.personsRoutes();
	}

	private shirtsRoutes() {
		this.app.route('/shirts')
			.get(cors(), this.shirtsController.getAll);
		this.app.route('/shirts/:url')
			.get(cors(), this.shirtsController.getByUrl)
	}

	private emailsRoutes() {
		this.app.route('/emails/confirmations')
			.post(cors(), this.emailsController.createConfirmation);
	}

	private personsRoutes() {
		this.app.route('/persons')
			.get(cors(), this.personsController.fullRegister);
	}

}