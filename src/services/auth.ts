import api from "./api";

type RegistrationDataType = {
    firstname:string
    lastname:string
    email:string
    password:string
    role:string
}

export const registration = async(data: RegistrationDataType) => {
    const res = await api.post("auth/register",data)
    return  res.data
}

export const login = async(email:string, password:string)=>{
    const res = await api.post("auth/login",{email,password})
    return res.data
}