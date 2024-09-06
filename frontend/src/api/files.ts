import http from "./http";

export function post(data: FormData, cfg = {}){
    return http.post('/file', data, cfg)
}

export function getList(){
    return http.get('/file_list')
}