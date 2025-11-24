import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import {lazy, Suspense, type ReactNode } from 'react'
import { useAuth } from "../context/authContext";
import Layout from "../components/Layout"

const Home = lazy(() => import ('../Pages/HomePage'))
const Login = lazy(() => import ('../Pages/LoginPage'))
const Register = lazy(() => import ('../Pages/RegisterPage'))
const Welcome = lazy(() => import ('../Pages/WelcomePage'))
const Post = lazy(() => import("../Pages/Post"))
const MyPost = lazy(() => import("../Pages/MyPost"))

type RequireAuthTypes = {children:ReactNode;  roles?: string[] }

const RequireAuth = ({children,roles}:RequireAuthTypes) => {
    const {user,loading} = useAuth()

    if(loading){
      return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
    }

    if(!user){
      return <Navigate to="/login" replace/>
    }

    if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

    return <>{children}</>
}

// export default function Router (){
//     return(
//           <BrowserRouter>
//       <Suspense fallback={<div>Loading ....</div>}>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Register />} />
//         <Route path="/welcome" element={<Welcome />} />

//         <Route path="/home" element={<RequireAuth>
//           <Home />
//         </RequireAuth>} />
        
//       </Routes>
//       </Suspense>
//     </BrowserRouter>
//     )
// }

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route
              path="/my-post"
              element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <MyPost />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}