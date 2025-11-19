import { useAuth } from "../context/authContext"

export default function HomePage() {
    const {user} = useAuth()
    return <div><h1>{user?.email}</h1></div>
    
}