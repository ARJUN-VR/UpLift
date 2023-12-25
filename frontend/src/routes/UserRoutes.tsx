import { Route,Routes } from "react-router-dom"
import { SignInPage } from "../pages/userPages/SignInPage"
import { SignUpPage } from "../pages/userPages/SignUpPage"
import { HomePage } from "../pages/userPages/HomePage"
import { UserPrivateRoutes } from "./UserPrivateRoutes"





export const UserRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<SignInPage/>}/>
            <Route path="/register" element={<SignUpPage/>}/>

            {/* Private Routes */}

            <Route path="" element={<UserPrivateRoutes/>}>
            <Route path="/profile" element={<HomePage/>}/>  
            </Route>
             
        </Routes>
 
  )
}
