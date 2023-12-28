
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
<div className="bg-gray-800 flex ">
<SideBar/>
<div >
{path =='/' ? (<Content/>): path =='/profile' ? (<Profile/>):null}
</div>
</div>
   </div>
 

  
  )
}
