
import { Content } from "../../components/userComponents/Content"
import { Header } from "../../components/userComponents/Header"
import { SideBar } from "../../components/userComponents/SideBar"
import { Profile } from "../../components/userComponents/Profile"
import { useLocation , useNavigate} from "react-router-dom"
import { Suspense, lazy} from 'react'

import { CreatorDashboard } from "../../components/creatorComponents/CreatorDashboard"

import useRealTimeSearch from "../../customHooks/useRealtimeSearch"




const CampaignDetails = lazy(()=> import('../../components/userComponents/campaignComponents/CampaignDetails'))





export const HomePage = () => {

  const location = useLocation()
  const path = location.pathname

  const navigate = useNavigate()

  const {handleSearchQuery,searchResults} = useRealTimeSearch()


  console.log(searchResults)

  

  return (
    <div className="bg-[#0c0c0c] min-h-screen">
    <Header handleSearchQuery={handleSearchQuery}/>
    <div className="flex">
      <div className="sticky">
        <SideBar/> 
      </div>
      {searchResults && searchResults.length > 0 ? (
        <div className="w-full flex bg-[#0c0c0c] mt-5 flex-wrap space-x-4 mb-10 text-white">
          {searchResults.map((campaign) => (
            <Suspense key={campaign._id} fallback={<div>Loading...</div>}>
              <CampaignDetails campaign={campaign} navigate={navigate}/>
            </Suspense>
          ))}
        </div>
      ) : (
        <div className="w-full">
          {path === '/' ? <Content/> : path === '/profile' ? <Profile/> : path === '/dashboard' ? <CreatorDashboard/> : null}
        </div>
      )}
    </div>
  </div>
   



  
  )
}
