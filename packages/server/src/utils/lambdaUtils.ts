export const parseBody = (body: unknown): unknown => {
	return typeof body === 'string' ? JSON.parse(body) : body
}

export const uuidv4 = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}
