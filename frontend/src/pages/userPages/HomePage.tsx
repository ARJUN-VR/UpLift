
import { Content } from "../../components/userComponents/Content"
import { Header } from "../../components/userComponents/Header"
import { SideBar } from "../../components/userComponents/SideBar"
import { Profile } from "../../components/userComponents/Profile"
import { useLocation } from "react-router-dom"




export const HomePage = () => {

  const location = useLocation()
  const path = location.pathname

  return (

   <div className="bg-gray-800 h-screen">
   <Header/>
<div className="bg-gray-800 flex">
<SideBar/>
<div className="bg-gray-800 w-full h-[570px] mt-20 rounded-2xl mr-5">
{path =='/' ? (<Content/>): path =='/profile' ? (<Profile/>):null}
</div>
</div>
   </div>
 

  
  )
}
