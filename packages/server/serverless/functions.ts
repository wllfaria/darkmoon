import * as Aws from 'serverless/aws'

const functions: Aws.Functions = {
	info: {
		handler: 'src/handlers/info.getInfo',
		events: [
			{
				http: {
					method: 'get',
					path: 'info'
				}
			}
		]
	},
	verifyToken: {
		handler: 'src/handlers/auth.checkAuthentication',
		events: [
			{
				http: {
					method: 'get',
					path: 'auth/verify'
				}
			}
		]
	},
	authenticate: {
		handler: 'src/handlers/auth.authenticate',
		events: [
			{
				http: {
					method: 'post',
					path: 'auth/verify'
				}
			}
		]
	},
	createProduct: {
		handler: 'src/handlers/product.create',
		events: [
			{
				http: {
					method: 'post',
					path: 'products'
				}
			}
		]
	},
	getProduct: {
		handler: 'src/handlers/product.getOne',
		events: [
			{
				http: {
					method: 'get',
					path: 'products/{productId}'
				}
			}
		]
	},
	deleteProduct: {
		handler: 'src/handlers/product.deleteOne',
		events: [
			{
				http: {
					method: 'delete',
					path: 'products/{productId}'
				}
			}
		]
	}
}

export default functions
