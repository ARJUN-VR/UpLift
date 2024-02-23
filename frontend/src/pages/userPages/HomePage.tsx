
import { Content } from "../../components/userComponents/Content"
import { Header } from "../../components/userComponents/Header"
import { SideBar } from "../../components/userComponents/SideBar"
import { Profile } from "../../components/userComponents/Profile"
import { useLocation } from "react-router-dom"
import { DasboardPage } from "./DasboardPage"
import { CreatorDashboard } from "../../components/creatorComponents/CreatorDashboard"
import { SearchResultPage } from "../../components/userComponents/SearchResultPage"
import {useState} from 'react'







export const HomePage = () => {

  const [searchResult,setSearchResult] = useState<string[]>([])

  const location = useLocation()
  const path = location.pathname

  const getResult = async(result)=>{
    setSearchResult(result)

  }
  console.log(searchResult)

  return (
  
     <div className="bg-[#0c0c0c] min-h-screen">
      <Header callback={getResult}/>
      <div className="flex">
        <div className="sticky">
          <SideBar/> 
        </div>
        <div className="w-full">
        {path =='/' ? (<Content/>): path =='/profile' ? (<Profile/>): path =='/dashboard'?(<CreatorDashboard/>): path == '/search'?(<SearchResultPage Result={searchResult} />):null}
        </div>
      </div>
   </div>
 
   



  
  )
}
