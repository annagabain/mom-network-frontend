import axios from "axios";

axios.defaults.baseURL = 'https://mom-network-backend.herokuapp.com'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

// for refreshing access tokens
// to intersept request
export const axiosReq = axios.create()

// to intercept response
export const axiosRes = axios.create()