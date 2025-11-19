import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import {lazy, Suspense, type ReactNode } from 'react'
import { useAuth } from "../context/authContext";

const Home = lazy(() => import ('../Pages/HomePage'))
const Login = lazy(() => import ('../Pages/LoginPage'))
const Register = lazy(() => import ('../Pages/RegisterPage'))
const Welcome = lazy(() => import ('../Pages/WelcomePage'))

type RequireAuthTypes = {children:ReactNode}
const RequireAuth = ({children}:RequireAuthTypes) => {
    const {user,loading} = useAuth()

    if(loading){
      return <><div>User Loading</div></>
    }

    if(!user){
      return <Navigate to="/login" replace/>
    }

    return <>{children}</>
}

export default function Router (){
    return(
          <BrowserRouter>
      <Suspense fallback={<div>Loading ....</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/home" element={<RequireAuth>
          <Home />
        </RequireAuth>} />
        
      </Routes>
      </Suspense>
    </BrowserRouter>
    )
}