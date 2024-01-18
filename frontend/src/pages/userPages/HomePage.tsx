
import { Content } from "../../components/userComponents/Content"
import { Header } from "../../components/userComponents/Header"
import { SideBar } from "../../components/userComponents/SideBar"
import { Profile } from "../../components/userComponents/Profile"
import { useLocation } from "react-router-dom"
import { Carousel } from "../../components/userComponents/Carousel"
import { ExploreCard } from "../../components/userComponents/ExploreCard"





export const HomePage = () => {

  const location = useLocation()
  const path = location.pathname

  return (

 <div className="bg-[#0c0c0c] h-screen flex flex-col overflow-y-auto">
   <Header/>

   <SideBar/> 

<div className="bg-[#0c0c0c]  ml-72 h-[68%]  flex ">
<Carousel/>
<ExploreCard/>
</div>
<div className="ml-72">
{path =='/' ? (<Content/>): path =='/profile' ? (<Profile/>):null}

</div>

   </div>
 

  
  )
}
