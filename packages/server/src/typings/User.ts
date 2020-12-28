import { Address } from './Address'
import { Preferences } from './Preferences'

export interface User {
	id: string
	image?: string
	password?: string
	email: string
	username: string
	cpf: string
	addresses: Address[]
	preferences: Preferences
}
