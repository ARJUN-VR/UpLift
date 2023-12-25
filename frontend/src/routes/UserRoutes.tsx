import { Route,Routes } from "react-router-dom"
import { SignInPage } from "../pages/userPages/SignInPage"
import { SignUpPage } from "../pages/userPages/SignUpPage"
import { HomePage } from "../pages/userPages/HomePage"
import { UserProfie } from "../pages/userPages/UserProfile"



export const UserRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<SignInPage/>}/>
            <Route path="/register" element={<SignUpPage/>}/>
            <Route path="/profile" element={<UserProfie/>}/>
          
        </Routes>
 
  )
}
