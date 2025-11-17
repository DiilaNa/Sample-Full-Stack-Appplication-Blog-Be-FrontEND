import axios, { AxiosError } from "axios";
import { refreshTokens } from "./auth";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1"
})

const PUBLIC_ENDPOINTS = ["/auth/login","/auth/register"]

api.interceptors.request.use((cofig) => {

    const token = localStorage.getItem("accessToken")
    const isPublic = PUBLIC_ENDPOINTS.some((url) => cofig.url?.includes(url));

    if(token && !isPublic){
        cofig.headers.Authorization =`Bearer ${token}`
    }
    return cofig
    
})

api.interceptors.response.use( 
    (response) => {
        return response
    },
    async (err:AxiosError) => {
        const originalRequest:any = err.config
        const isPublic = PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url));

        if(err.response?.status === 401 && !isPublic && !originalRequest._retry) {
            originalRequest._retry = true
            try{
                const refreshToken = localStorage.getItem("refreshToken")
                if(!refreshToken){
                    throw new Error("No Refresh Token available")
                }
                const res = await refreshTokens(refreshToken)
                localStorage.setItem("accessToken",res.accessToken)
                originalRequest.headers.Authorization = `Bearer ${res.accessToken}`
                return axios(originalRequest)
            }catch(err){
                localStorage.clear()
                window.location.href = "/login"
                return Promise.reject(err)
            }
        }
        return Promise.reject(err)
    }
)

export default api