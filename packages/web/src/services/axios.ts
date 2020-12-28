import axios, { AxiosError } from 'axios'
import { AuthPayload } from '../typings/Auth'
import { __API_URL__ } from '../utils/consts'

const api = axios.create({ baseURL: __API_URL__ })

api.interceptors.request.use(config => {
	if (config.url.includes('https://')) return config
	const authPayload: AuthPayload = JSON.parse(localStorage.getItem('darkmoonuser'))
	if (!authPayload) return config
	config.headers.Authorization = authPayload.token
	return config
})

api.interceptors.response.use(
	response => response,
	(err: AxiosError) => {
		console.log(err)
		if (err.response?.status === 401) {
			localStorage.removeItem('darkmoonuser')
			window.location.reload()
		}
		return Promise.reject(err)
	}
)

export default api
