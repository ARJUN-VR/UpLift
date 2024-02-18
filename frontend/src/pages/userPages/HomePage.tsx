
import { Content } from "../../components/userComponents/Content"
import { Header } from "../../components/userComponents/Header"
import { SideBar } from "../../components/userComponents/SideBar"
import { Profile } from "../../components/userComponents/Profile"
import { useLocation } from "react-router-dom"
import { DasboardPage } from "./DasboardPage"
import { CreatorDashboard } from "../../components/creatorComponents/CreatorDashboard"







export const HomePage = () => {

  const location = useLocation()
  const path = location.pathname

  return (
  
     <div className="bg-[#0c0c0c] min-h-screen">
      <Header/>
      <div className="flex">
        <div className="sticky">
          <SideBar/> 
        </div>
        <div className="w-full">
        {path =='/' ? (<Content/>): path =='/profile' ? (<Profile/>): path =='/dashboard'?(<CreatorDashboard/>):null}
        </div>
      </div>
   </div>
 
   



  
  )
}
