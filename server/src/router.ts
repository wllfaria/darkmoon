import * as core from "express-serve-static-core";
import ShirtsController from './controllers/shirts.controller';
const cors = require('cors')

export default class Router {

	private app: core.Express;
	private shirtsController: ShirtsController;

	constructor(app: core.Express) {
			this.app = app;
			this.shirtsController = new ShirtsController();
	}

	public initializeRoutes() {
		this.shirtsRoutes();
	}

	private shirtsRoutes() {
		this.app.route('/shirts')
			.get(cors(), this.shirtsController.getAll);
		this.app.route('/shirts/:url')
			.get(cors(), this.shirtsController.getByUrl)
	}

}