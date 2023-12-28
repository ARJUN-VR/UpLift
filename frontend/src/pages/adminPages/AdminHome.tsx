import { useLocation } from "react-router-dom"
import SideBar from "../../components/adminComponents/SideBar"
import { TableList } from "../../components/adminComponents/TableList"
import { AdminCard } from "../../components/adminComponents/AdminCard"

export const AdminHome = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <div className="bg-blue-100 w-full h-screen flex">
      <SideBar/>
     
      {path=='/admin/home'? <AdminCard/>:<TableList/>}
      
    </div>
  )
}
