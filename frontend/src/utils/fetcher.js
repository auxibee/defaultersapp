import axios from 'axios'
import { LOCALHOST_API_URL } from 'config/index';


// export const baseURL = process.env.NODE_ENV === 'development'
//     ?  LOCALHOST_API_URL
//     :  `https://${process.env.BACKEND_API}/api`
export const baseURL = 'https://auxibee217.pythonanywhere.com/api'
export const publicFetch = axios.create({baseURL})