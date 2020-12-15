export default interface HashContract {
	hash: (plainString: string) => Promise<string>
	verify: (hashedString: string, plainString: string) => Promise<boolean>
}
