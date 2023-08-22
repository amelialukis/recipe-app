import axios from "axios";
import {camelizeKeys} from "humps"

const BASE_URL = " http://localhost:8000/"
const TOKEN_KEY = "token"

export const useLogout = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const client = axios.create({
    baseURL: BASE_URL
})

client.interceptors.request.use((config)=>{
    const token = localStorage.getItem(TOKEN_KEY)
    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    return config
})

client.interceptors.response.use((response)=>{
    if(response.data){
        response.data = camelizeKeys(response.data)
    }
    return response
})