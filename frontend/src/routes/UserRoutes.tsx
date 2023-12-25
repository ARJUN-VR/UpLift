import { Route,Routes } from "react-router-dom"
import { SignInPage } from "../pages/userPages/SignInPage"
import { SignUpPage } from "../pages/userPages/SignUpPage"
import { HomePage } from "../pages/userPages/HomePage"
import { ModalPage } from "../pages/userPages/ModalPage"




export const UserRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<SignInPage/>}/>
            <Route path="/register" element={<SignUpPage/>}/>
            <Route path="/profile" element={<HomePage/>}/>  
            <Route path="modal" element={<ModalPage/>}/>        
        </Routes>
 
  )
}
