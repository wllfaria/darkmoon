import type { Serverless } from 'serverless/aws'
import functions from './serverless/functions'
import resources from './serverless/resources'

const serverlessConfiguration: Serverless = {
	service: {
		name: 'DarkmoonCloud'
	},
	frameworkVersion: '>=1.72.0',
	custom: {},
	package: {
		excludeDevDependencies: false
	},
	plugins: [
		'serverless-plugin-typescript',
		'serverless-offline',
		'serverless-plugin-monorepo',
		'serverless-plugin-include-dependencies'
	],
	provider: {
		name: 'aws',
		runtime: 'nodejs12.x',
		apiGateway: {
			minimumCompressionSize: 1024
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
		},
		iamRoleStatements: [
			{
				Effect: 'Allow',
				Action: ['dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem'],
				Resource: '*'
			}
		]
	},
	resources,
	functions
}

module.exports = serverlessConfiguration
