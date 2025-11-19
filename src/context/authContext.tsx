import {createContext, useContext, useEffect, useState } from "react";
import { getMyDetails } from "../services/auth";

const AuthContext = createContext<any>(null);

export const AuthProvide = ({children}:any) =>{
    const[user,setUser] = useState<any>(null)
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(token){
            getMyDetails()
            .then((res) => {
                setUser(res.data)
            })
            .catch((err)=>{
                setUser(null)
                console.error(err)
            })
            .finally(()=>{
                setLoading(false)
            })
        }else{
            setUser(null)
            setLoading(false)
        }
    },[])

    return(
        <AuthContext.Provider value = {{user,setUser,loading}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error(
            "useAuth must be within an AUthProvider"
        )
    }
    return context
}