import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})


export const hmsApi = Axios.create({
  baseURL: 'https://api.100ms.live/v2/rooms'
})
