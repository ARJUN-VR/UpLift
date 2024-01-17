import React, { useEffect, useState } from 'react'
import { Campaign } from '../userComponents/Content'
import { useNavigate } from 'react-router-dom'
import { useGetVerifiedCampaignsMutation } from '../../redux/slices/adminApiSlice'
import Loader from '../userComponents/Loader'

export const VerifiedCampaign = () => {
    const [campaigns,setCampaigns] = useState<Array<Campaign>>([])

    const navigate = useNavigate()

    const [getVerifiedCampaigns,{isLoading}] = useGetVerifiedCampaignsMutation()

    useEffect(()=>{
        const list = async()=>{
          try{
        const data  = await getVerifiedCampaigns('').unwrap()
        console.log(data)
        const list = data?.campaigns
      
        setCampaigns(list)
          }catch(error){
            console.log(error)
          }
        }
        list()
     
      },[getVerifiedCampaigns])


  return (
     
    <div className='w-full flex justify-center mt-10'>
      <div className="w-full ml-10 mr-10">
        <h2 className="text-2xl font-bold mb-4">Live Campaigns</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex items-center justify-center w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Target
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
             
              </tr>
            </thead>
            <tbody>
             {isLoading?(
                <Loader/>
             ):(
                <div></div>
             )}
              {campaigns.map((campaign, key) => (
                <tr key={key} className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4" >
                    {campaign.title}
                  </td>
                  <td className="px-6 py-4">{campaign.location}</td>
                  <td className="px-6 py-4">{campaign.target}</td>
                  <td className="px-6 py-4">{campaign.duration}</td>
                  <td className="px-6 py-4" onClick={() => navigate(`/admin/campaignView/:id=${campaign._id}`)}>
                    <img src={campaign.image} alt="card image" style={{ width: '150px', height: '100px' }} />
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
       
  )
}
