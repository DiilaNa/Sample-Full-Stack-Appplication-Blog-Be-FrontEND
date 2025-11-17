import { useState, type FormEvent } from "react"
import { getMyDetails, login } from "../services/auth"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const navigate = useNavigate()
    const[Email , setEmail] = useState("")
    const[Password , setPassword] = useState("")

    const handleLogin = async(e:FormEvent)=>{
        e.preventDefault()
        try{
           const res = await login(Email, Password)
            console.log(res.data.accessToken)
        
            if (!res.data.accessToken) {
                alert("Login Failed")
                return
            }
            await localStorage.setItem("accessToken", res.data.accessToken);
            await localStorage.setItem("refreshToken", res.data.refreshToken)

            const detail = await getMyDetails()

            console.log(detail.data)

            navigate("/")
        }catch(err){
             console.log("ERROR", err);
        }
    }
    return (
        <div>
             <div>Login Page</div>
             <input placeholder="Email"
                value={Email}
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