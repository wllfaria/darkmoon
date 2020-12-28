import { DynamoDB } from 'aws-sdk'
import { encodePayload } from '../utils/authUtils'
import { AuthPayload, ChangePasswordPayload, LoginPayload, RegisterPayload } from '../typings/Auth'
import { uuidv4 } from '../utils/lambdaUtils'
import { User } from '../typings/User'
import Argon from '../services/argon'

class AuthModel {
	private dynamoInstance = new DynamoDB.DocumentClient()
	private usersTable = 'Users'

	public async authenticate(authPayload: LoginPayload): Promise<AuthPayload> {
		const user = await this.getUserByEmail(authPayload.email)
		if (!user) throw new Error('No user registered with provided email')

		const isSame = await new Argon().verify(user.password, authPayload.password)
		if (!isSame) throw new Error('Invalid email or password')

		delete user.password

		const encoded = encodePayload({ id: user.id, email: user.email })
		return { token: encoded, user }
	}

	public async register(registerPayload: RegisterPayload): Promise<AuthPayload> {
		const id = uuidv4()

		const hashedPassword = await new Argon().hash(registerPayload.password)
		const shapedUser = { id, ...registerPayload, password: hashedPassword }
		delete shapedUser.confirmation

		await this.dynamoInstance
			.put({
				TableName: this.usersTable,
				Item: shapedUser,
				ConditionExpression: 'email <> :email',
				ExpressionAttributeValues: { ':email': shapedUser.email }
			})
			.promise()

		const user = await this.getUserByEmail(registerPayload.email)

		delete user.password

		const encoded = encodePayload({ id: user.id, email: user.email })
		return { token: encoded, user }
	}

	public async getUserByEmail(email: string): Promise<User> {
		const { Item } = await this.dynamoInstance.get({ TableName: this.usersTable, Key: { email } }).promise()
		return Item as User
	}

	public async changePassword(changePasswordPayload: ChangePasswordPayload) {
		const user = await this.getUserByEmail(changePasswordPayload.email)
		if (!user) throw new Error('No user registered with provided email')

		const isSame = await new Argon().verify(user.password, changePasswordPayload.oldPassword)
		if (!isSame) throw new Error('Invalid password')

		const hashedPassword = await new Argon().hash(changePasswordPayload.newPassword)

		await this.dynamoInstance
			.update({
				TableName: this.usersTable,
				Key: {
					email: user.email
				},
				UpdateExpression: 'set password = :password',
				ExpressionAttributeValues: {
					':password': hashedPassword
				},
				ReturnValues: 'UPDATED_NEW'
			})
			.promise()

		delete user.password
		return user
	}
}

export default new AuthModel()
