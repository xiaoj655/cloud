import axios from "axios"


const http = axios.create({
    timeout: 1000,
    baseURL: 'http://139.159.135.46:5000'
})

http.interceptors.response.use((config) => {
    return Promise.resolve(config.data)
})

http.interceptors.request.use((config)=> {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config
})

export default http;