import { AuthPayload } from '../typings/auth'
import { encodePayload } from '../utils/auth'

export const authenticate = async (username: string, _password: string): Promise<AuthPayload> => {
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