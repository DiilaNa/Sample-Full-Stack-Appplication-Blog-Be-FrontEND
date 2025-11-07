import axios from "axios"
import { useState, type FormEvent } from "react"
import { registration } from "../services/auth"
import { useNavigate } from "react-router-dom"

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
            
        //    const response =  await axios.post(
        //     "http://localhost:5000/api/v1/auth/register",
        //      {
        //         firstname: FirstName,
        //         lastname: LastName,
        //         email: Email,
        //         password: Password,
        //         role: Role
        //      },
        //      {
        //         headers:{
        //             "Content-Type":"application/json"
        //         }
        //      })

        //      console.log(response);
             

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
                <option value="USER">USER</option>
                <option value="AUTHOR">AUTHOR</option>
            </select>
            <button onClick={handleregister}>Register</button>
        </div>
       
    )
}