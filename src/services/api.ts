import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1"
})

const PUBLIC_ENDPOINTS = ["/auth/login","/auth/register"]

api.interceptors.request.use((cofig) => {
    cofig.headers
    cofig.url

    const token = localStorage.getItem("accessToken")
    const isPublic = PUBLIC_ENDPOINTS.some((url) => cofig.url?.includes(url));

    if(token && !isPublic){
        cofig.headers.Authorization =`Bearer $(token)`
    }
    return cofig
    
})

export default api