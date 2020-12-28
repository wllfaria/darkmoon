import { DynamoDB } from 'aws-sdk'
import { Address, AddressPayload, DeleteAddressPayload, UpdateAddressesPayload } from '../typings/Address'
import { UpdateUserInformationPayload } from '../typings/Auth'
import { User } from '../typings/User'
import { uuidv4 } from '../utils/lambdaUtils'
import { UpdateThemePayload } from '../typings/Preferences'

class UserModel {
	private dynamoInstance = new DynamoDB.DocumentClient()
	private usersTable = 'Users'

	public async updateInformation(updateInformationPayload: UpdateUserInformationPayload) {
		const user = await this.getUserByEmail(updateInformationPayload.email)
		if (!user) throw new Error('No user registered with provided email')
		delete user.password

		const updated = await this.dynamoInstance
			.update({
				TableName: this.usersTable,
				Key: {
					email: user.email
				},
				UpdateExpression: 'set username = :username, cpf = :cpf',
				ExpressionAttributeValues: {
					':username': updateInformationPayload.username,
					':cpf': updateInformationPayload.cpf
				},
				ReturnValues: 'UPDATED_NEW'
			})
			.promise()
		return { ...user, ...updated.Attributes }
	}

	public async createAddress(addressPayload: AddressPayload) {
		const user = await this.getUserByEmail(addressPayload.email)
		if (!user) throw new Error('No user registered with provided email')
		delete user.password

		const id = uuidv4()
		delete addressPayload.email
		const payloadWithId = { ...addressPayload, id }

		const newAddresses = user.addresses || []

		newAddresses.forEach(address => {
			if (address.addressName === payloadWithId.addressName) {
				throw new Error(`An address with the name of ${payloadWithId.addressName} already exists`)
			}
		})

		newAddresses.push(payloadWithId as Address)

		const updated = await this.dynamoInstance
			.update({
				TableName: this.usersTable,
				Key: {
					email: user.email
				},
				UpdateExpression: 'set addresses = :addresses',
				ExpressionAttributeValues: {
					':addresses': newAddresses
				},
				ReturnValues: 'UPDATED_NEW'
			})
			.promise()
		return { ...user, addresses: updated.Attributes.addresses }
	}

	public async updateAddresses(addressesPayload: UpdateAddressesPayload) {
		const user = await this.getUserByEmail(addressesPayload.email)
		if (!user) throw new Error('No user registered with provided email')
		delete user.password

		for (let i = 0; i < addressesPayload.addresses.length; i++) {
			for (let j = 1; j < addressesPayload.addresses.length; j++) {
				if (addressesPayload.addresses[i].addressName === addressesPayload.addresses[j].addressName && i !== j) {
					throw new Error(`An address with the name of ${addressesPayload.addresses[j].addressName} already exists`)
				}
			}
		}

		await this.dynamoInstance
			.update({
				TableName: this.usersTable,
				Key: {
					email: user.email
				},
				UpdateExpression: 'set addresses = :addresses',
				ExpressionAttributeValues: {
					':addresses': addressesPayload.addresses
				},
				ReturnValues: 'UPDATED_NEW'
			})
			.promise()
		return { ...user, addresses: addressesPayload.addresses }
	}

	public async deleteAddress(deleteAddressPayload: DeleteAddressPayload) {
		const user = await this.getUserByEmail(deleteAddressPayload.email)
		if (!user) throw new Error('No user registered with provided email')
		delete user.password

		const addresses = [...user.addresses]

		const addressIndex = addresses.reduce((initial, current, i) => {
			if (current.addressName === deleteAddressPayload.addressName) {
				initial = i
			}
			return initial
		}, 0)

		addresses.splice(addressIndex, 1)

		await this.dynamoInstance
			.update({
				TableName: this.usersTable,
				Key: {
					email: user.email
				},
				UpdateExpression: 'set addresses = :addresses',
				ExpressionAttributeValues: {
					':addresses': addresses
				},
				ReturnValues: 'UPDATED_NEW'
			})
			.promise()

		return { ...user, addresses: addresses }
	}

	public async updateThemePreference(themePreferencePayload: UpdateThemePayload) {
		const user = await this.getUserByEmail(themePreferencePayload.email)
		if (!user) throw new Error('No user registered with provided email')
		delete user.password

		let updated: DynamoDB.DocumentClient.UpdateItemOutput
		if (!user.preferences) {
			const preferences = { theme: themePreferencePayload.theme }
			updated = await this.dynamoInstance
				.update({
					TableName: this.usersTable,
					Key: {
						email: user.email
					},
					UpdateExpression: 'set preferences = :preferences',
					ExpressionAttributeValues: {
						':preferences': preferences
					},
					ReturnValues: 'UPDATED_NEW'
				})
				.promise()
		} else {
			updated = await this.dynamoInstance
				.update({
					TableName: this.usersTable,
					Key: {
						email: user.email
					},
					UpdateExpression: 'set preferences.theme = :theme',
					ExpressionAttributeValues: {
						':theme': themePreferencePayload.theme
					},
					ReturnValues: 'UPDATED_NEW'
				})
				.promise()
		}
		return { ...user, preferences: updated.Attributes.preferences }
	}

	public async getUserByEmail(email: string): Promise<User> {
		const { Item } = await this.dynamoInstance.get({ TableName: this.usersTable, Key: { email } }).promise()
		return Item as User
	}
}

export default new UserModel()
