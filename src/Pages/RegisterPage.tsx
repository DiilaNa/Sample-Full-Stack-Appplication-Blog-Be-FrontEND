import { useState, type FormEvent } from "react"
import { registration } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const navigate = useNavigate()
    const[FirstName , setFirstName] = useState("")
    const[LastName , setLastName] = useState("")
    const[Email , setEmail] = useState("")
    const[Password , setPassword] = useState("")
    const[ConfirmPassword , setConfirmPassword] = useState("")
    const[Role , setRole] = useState("USER")

    const handleregister = async(e:FormEvent)=>{
        e.preventDefault()
        if(!FirstName || !LastName || !Email || !Password || !ConfirmPassword || !Role){
            alert("Please fill all the fields")
            return
        }
        if(Password !== ConfirmPassword){
            alert("Password Do not match")
            return
        }

        try{
            const obj = {
                firstname: FirstName,
                lastname: LastName,
                email: Email,
                password: Password,
                role: Role
            }

            const res:any = await registration(obj)
            console.log(res);
            alert("Register Done")
            navigate('/login')
             
        }catch(err:any){
             console.error(err?.response?.data);
                
        }

    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join us today to start your journey</p>
                </div>
                
                <form onSubmit={handleregister} className="space-y-4">
                    <div>
                        <input 
                            placeholder="First Name"
                            type="text"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    
                    <div>
                        <input 
                            placeholder="Last Name"
                            type="text"
                            value={LastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    
                    <div>
                        <input 
                            placeholder="Email"
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    
                    <div>
                        <input 
                            placeholder="Password"
                            type="password"
                            value={Password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    
                    <div>
                        <input 
                            placeholder="Confirm Password"
                            type="password"
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    
                    <div>
                        <select 
                            value={Role} 
                            onChange={(e)=>setRole(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                        >
                            <option value="USER">USER</option>
                            <option value="AUTHOR">AUTHOR</option>
                        </select>
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02]"
                    >
                        Register
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account? 
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}