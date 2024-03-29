import { useLocation } from "react-router-dom"
import SideBar from "../../components/adminComponents/SideBar"
import { TableList } from "../../components/adminComponents/TableList"
import { AdminCard } from "../../components/adminComponents/AdminDashboard"
import { CampaignList } from "../../components/adminComponents/CampaignList"
import { CampaignView } from "../../components/adminComponents/CampaignView"
import { VerifiedCampaign } from "../../components/adminComponents/VerifiedCampaign"
import { Category } from "../../components/adminComponents/Category"


export const AdminHome = () => {
  const location = useLocation()
  const path = location.pathname

  

  return (
    <div className="bg-blue-100 w-full h-screen flex">
      <SideBar  />
     
      {path=='/admin/home'? (<AdminCard/>):path=='/admin/users' ? (<TableList/>):path=='/admin/campaigns'?(<VerifiedCampaign/>): path.startsWith('/admin/campaignView/')?(<CampaignView/>):path=='/admin/notifications'?(<CampaignList/>):path=='/admin/category'?(<Category/>):null}
      
    </div>
  )
}
