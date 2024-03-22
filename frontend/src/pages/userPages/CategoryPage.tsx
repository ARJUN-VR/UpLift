import { Suspense } from 'react'
import { Header } from '../../components/userComponents/Header'
import { SideBar } from '../../components/userComponents/SideBar'
import { Category } from '../../components/userComponents/Category'
import useRealTimeSearch from '../../customHooks/useRealtimeSearch'
import CampaignDetails from '../../components/userComponents/campaignComponents/CampaignDetails'
import { useNavigate, useParams } from 'react-router-dom'




export const CategoryPage = () => {
  const {handleSearchQuery,searchResults} = useRealTimeSearch()
  const navigate = useNavigate()
  const category = useParams()
  const value = category.cat?.slice(1)
  console.log(value,'need')
  const filterdResults = searchResults.filter(result=>result.category===value)
  console.log('filtered:',filterdResults)
  console.log('search Result:',searchResults)
  return (
    
    <div className="bg-[rgb(12,12,12)] min-h-screen">
    <Header handleSearchQuery={handleSearchQuery}/>
    <div className="flex">
      <div className="sticky">
        <SideBar/> 
      </div>
      <div>
      {filterdResults && filterdResults.length > 0 ? (
        <div className="w-full flex bg-[#0c0c0c] mt-5 flex-wrap space-x-4 mb-10 text-white">
          {filterdResults.map((campaign) => (
            <Suspense key={campaign._id} fallback={<div>Loading...</div>}>
              <CampaignDetails campaign={campaign} navigate={navigate}/>
            </Suspense>
          ))}
        </div>
      ) : (
        <Category/>
        
      )}
      </div>
    </div>
 </div>
  )
}
