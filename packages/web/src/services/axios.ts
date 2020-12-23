import axios from 'axios'
import { __API_URL__ } from '../utils/consts'
console.log(__API_URL__)
const api = axios.create({ baseURL: __API_URL__ })

export default api
