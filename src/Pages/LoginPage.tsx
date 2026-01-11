import { useState, type FormEvent } from "react"
import { getMyDetails, login } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input 
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        ></input>
                    </div>
                    
                    <div>
                        <input 
                            placeholder="Password"
                            value={Password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            type="password"
                        ></input>
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02]"
                    >
                        Login
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account? 
                        <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}