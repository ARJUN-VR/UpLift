import { Route,Routes } from "react-router-dom"
import { SignInPage } from "../pages/userPages/SignInPage"
import { SignUpPage } from "../pages/userPages/SignUpPage"
import { HomePage } from "../pages/userPages/HomePage"
import { UserPrivateRoutes } from "./UserPrivateRoutes"
import { EmailVerification } from "../components/userComponents/EmailVerification"
import { OtpVerification } from "../components/userComponents/OtpVerification"
import { SetNewPassowrd } from "../components/userComponents/SetNewPassowrd"
import { CampaignPage } from "../pages/userPages/campaign/CampaignPage"
import { SinglePageView } from "../pages/userPages/SinglePageView"
import { CategoryPage } from "../pages/userPages/CategoryPage"
import { SuccessPage } from "../pages/userPages/SuccessPage"
import { CommunityPage } from "../pages/userPages/CommunityPage"





export const UserRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<SignInPage/>}/>
            <Route path="/register" element={<SignUpPage/>}/>
            <Route path="/email-verification" element={<EmailVerification/>}/>
            <Route path="/otp" element={<OtpVerification/>}/>
            <Route path="/setpass" element={<SetNewPassowrd/>}/>
            <Route path="/campaign/:id" element={<SinglePageView/>}/>
            <Route path="/category/:cat" element={<CategoryPage/>}/>
            <Route path="/success" element={<SuccessPage/>}/>
            

            {/* Private Routes */}

            <Route path="" element={<UserPrivateRoutes/>}>
            <Route path="/profile" element={<HomePage/>}/>  
            <Route path="/create-campaign" element={<CampaignPage/>}/>
            <Route path="/create-campaign/advanced" element={<CampaignPage/>}/>
            <Route path='/create-campaign/reward' element={<CampaignPage/>}/>
            <Route path='/create-campaign/draft' element={<CampaignPage/>}/>
            <Route path="/community" element={<CommunityPage/>}/>



            
            </Route>
             
        </Routes>
 
  )
}
