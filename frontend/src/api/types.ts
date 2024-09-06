export interface Response<T = any>{
    detail: string,
    status_code: number,
    data: T
}