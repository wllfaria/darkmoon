export type AuthUser = {
	name: string
}

export type AuthPayload = {
	token: string
	user?: AuthUser
}
