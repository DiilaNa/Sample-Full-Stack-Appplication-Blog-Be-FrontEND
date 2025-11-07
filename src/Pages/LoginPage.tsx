import { useState, type FormEvent } from "react"
import { login } from "../services/auth"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const navigate = useNavigate()
    const[Email , setEmail] = useState("")
    const[Password , setPassword] = useState("")

    const handleLogin = async(e:FormEvent)=>{
        e.preventDefault()
        try{
            const res:any = await login(Email,Password)
            console.log(res);
            alert("Login Done")
            navigate("/welcome")
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