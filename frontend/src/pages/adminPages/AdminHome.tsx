import SideBar from "../../components/adminComponents/SideBar"
import { TableList } from "../../components/adminComponents/TableList"

export const AdminHome = () => {
  return (
    <div className="bg-blue-100 w-full h-screen flex">
      <SideBar/>
      <TableList/>
      
    </div>
  )
}
