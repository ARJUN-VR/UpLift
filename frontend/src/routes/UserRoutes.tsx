import { Route,Routes } from "react-router-dom"
import { SignInPage } from "../pages/userPages/SignInPage"
import { SignUpPage } from "../pages/userPages/SignUpPage"
import { HomePage } from "../pages/userPages/HomePage"
import { UserPrivateRoutes } from "./UserPrivateRoutes"
import { EmailVerification } from "../components/userComponents/EmailVerification"
import { OtpVerification } from "../components/userComponents/OtpVerification"
import { SetNewPassowrd } from "../components/userComponents/SetNewPassowrd"
import { CampaignPage } from "../pages/userPages/campaign/CampaignPage"





export const UserRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<SignInPage/>}/>
            <Route path="/register" element={<SignUpPage/>}/>
            <Route path="/email-verification" element={<EmailVerification/>}/>
            <Route path="/otp" element={<OtpVerification/>}/>
            <Route path="/setpass" element={<SetNewPassowrd/>}/>
            <Route path="/create-campaign" element={<CampaignPage/>}/>

            {/* Private Routes */}

            <Route path="" element={<UserPrivateRoutes/>}>
            <Route path="/profile" element={<HomePage/>}/>  
            
            </Route>
             
        </Routes>
 
  )
}
