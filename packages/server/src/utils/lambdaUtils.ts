export const parseBody = <T>(body: string | unknown): T => {
	return typeof body === 'string' ? JSON.parse(body) : body
}

export const uuidv4 = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
		const random = (Math.random() * 16) | 0
		const convertedChar = char === 'x' ? random : (random & 0x3) | 0x8
		return convertedChar.toString(16)
	})
}
