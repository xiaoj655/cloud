import http from "./http";
import { type Response } from "./types";

export function register(username: string, password: string): Promise<Response> {
    const formData = new FormData()
    formData.set('username', username)
    formData.set('password', password)
    return http.post('/register', formData)
}

export function login(username: string, password: string): Promise<Response>{
    const formData = new FormData()
    formData.set('username', username)
    formData.set('password', password)
    return http.post('/login', formData)
}

export function checkToken(){
    return http.get('/token')
}