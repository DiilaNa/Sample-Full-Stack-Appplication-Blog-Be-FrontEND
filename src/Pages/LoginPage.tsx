import { useState, type FormEvent } from "react"
import { getMyDetails, login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function LoginPage() {
    const navigate = useNavigate()
    
    const {setUser} = useAuth()
    const[email , setEmail] = useState("")
    const[Password , setPassword] = useState("")

    const handleLogin = async(e:FormEvent)=>{
         e.preventDefault()
         if(!email || !Password){
            alert("..All fields required")
            return
         }
        try{
           const res = await login(email, Password)
        
            if (!res.data.accessToken) {
                alert("Login Failed")
                return
            }
             localStorage.setItem("accessToken", res.data.accessToken);
             localStorage.setItem("refreshToken", res.data.refreshToken)

            const detail = await getMyDetails()
            setUser(detail.data)
            navigate("/home")

        }catch(err){
            console.log("ERROR", err);
        }
    }
    return (
        <div>
             <div>Login Page</div>
             <input placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
             ></input>
             <input placeholder="Password"
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
             ></input>
             <button onClick={handleLogin}>Login</button>
        </div>
       
    )
}