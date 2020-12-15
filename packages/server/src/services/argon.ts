import argon from 'argon2'
import HashContract from '../contracts/hashContract'

export default class Argon implements HashContract {
	public async hash(plainString: string): Promise<string> {
		const hashedString = await argon.hash(plainString)
		return hashedString
	}

	public async verify(hashedString: string, plainString: string): Promise<boolean> {
		const isValid = await argon.verify(hashedString, plainString)
		return isValid
	}
}
