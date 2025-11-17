import { BrowserRouter,Route,Routes } from "react-router-dom";
import { lazy, Suspense } from 'react'

const Home = lazy(() => import ('../Pages/HomePage'))
const Login = lazy(() => import ('../Pages/LoginPage'))
const Register = lazy(() => import ('../Pages/RegisterPage'))
const Welcome = lazy(() => import ('../Pages/WelcomePage'))

export default function Router (){
    return(
          <BrowserRouter>
      <Suspense fallback={<div>Loading ....</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />

      </Routes>
      </Suspense>
    </BrowserRouter>
    )
}