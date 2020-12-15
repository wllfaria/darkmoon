import * as Aws from 'serverless/aws'

enum HttpMethods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
	PATCH = 'patch'
}

const functions: Aws.Functions = {
	info: {
		handler: 'src/handlers/infoHandler.getInfo',
		events: [{ http: { method: HttpMethods.GET, path: 'info' } }]
	},
	verifyToken: {
		handler: 'src/handlers/authHandler.checkAuthentication',
		events: [{ http: { method: HttpMethods.GET, path: 'users/auth' } }]
	},
	authenticate: {
		handler: 'src/handlers/authHandler.authenticate',
		events: [{ http: { method: HttpMethods.POST, path: 'users/auth' } }]
	},
	registerUser: {
		handler: 'src/handlers/authHandler.register',
		events: [{ http: { method: HttpMethods.POST, path: 'users/register' } }]
	},
	createProduct: {
		handler: 'src/handlers/productHandler.create',
		events: [{ http: { method: HttpMethods.POST, path: 'products' } }]
	},
	getProduct: {
		handler: 'src/handlers/productHandler.getOne',
		events: [{ http: { method: HttpMethods.GET, path: 'products/{productId}' } }]
	},
	deleteProduct: {
		handler: 'src/handlers/productHandler.deleteOne',
		events: [{ http: { method: HttpMethods.DELETE, path: 'products/{productId}' } }]
	}
}

export default functions
