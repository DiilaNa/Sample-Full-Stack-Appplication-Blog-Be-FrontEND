import axios from "axios"
import { useState, type FormEvent } from "react"

export default function RegisterPage() {
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
            alert
            return
        }

        try{
           const response =  await axios.post(
            "http://localhost:5000/api/v1/auth/register",
             {
                firstname: FirstName,
                lastname: LastName,
                email: Email,
                password: Password,
                role: Role
             },
             {
                headers:{
                    "Content-Type":"application/json"
                }
             })

             console.log(response);
             

        }catch(err){
             console.log("ERROR", err);
                
        }

    }

    return(
        <div>
         <div>Register Page</div>
            <input placeholder="First Name"
                type="text"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input placeholder="Last Name"
                type="text"
                value={LastName}
                onChange={(e)=>setLastName(e.target.value)}
                
            />
            <input placeholder="Email"
                type="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input placeholder="Password"
                type="password"
                value={Password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            <input placeholder="Confirm Password"
                type="password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <select value={Role} onChange={(e)=>setRole(e.target.value)}>
                <option value="User">User</option>
                <option value="Author">Author</option>
            </select>
            <button onClick={handleregister}>Register</button>
        </div>
       
    )
}