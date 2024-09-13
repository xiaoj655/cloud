import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

const http = axios.create({
    timeout: 3000,
    baseURL
})

http.interceptors.response.use((config) => {
    return Promise.resolve(config.data)
})

http.interceptors.request.use((config)=> {
    if(!config.headers.Authorization)
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config
})

export default http;