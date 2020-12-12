import { DynamoDB } from 'aws-sdk'
import { encodePayload } from '../utils/authUtils'
import { AuthPayload } from '@darkmoon/typings/Auth'

const dynamoInstance = new DynamoDB.DocumentClient()
const UsersTable = 'Users'

export const authenticate = async (username: string, password: string): Promise<AuthPayload> => {
	// ToDo - make password hashed
	const user = await dynamoInstance
		.get({
			TableName: UsersTable,
			Key: {
				username,
				password
			}
		})
		.promise()

	console.log('Banana', user)

	const encoded = encodePayload({
		username
	})
	return {
		token: encoded,
		user: {
			name: username
		}
	}
}
