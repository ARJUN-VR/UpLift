import React, { useEffect, useState } from 'react'
import { Campaign } from '../userComponents/Content'

import { useNavigate } from 'react-router-dom'
import { useGetCampaignAdminMutation, useVerifyCampaignMutation } from '../../redux/slices/adminApiSlice'
import { toast } from 'react-toastify'
import Loader from '../userComponents/Loader'


export const CampaignList = ({sendCount}) => {

    const [campaigns,setCampaigns] = useState<Array<Campaign>>([])

    const [getCampaign] = useGetCampaignAdminMutation()

    const [verifyCampaign,{isLoading}] = useVerifyCampaignMutation()

    const navigate = useNavigate()

    useEffect(()=>{
        const list = async()=>{
          try{
        const data  = await getCampaign(' ').unwrap()
  const list = data.list
  const listCount = list.length
  sendCount(listCount)


      
        setCampaigns(list)
          }catch(error){
            console.log(error)
          }
        }
        list()
     
      },[])

 

      const verify=async(id:string)=>{
        try {
          console.log(id)
          await verifyCampaign({id}).unwrap()
          toast.success('verified')
        } catch (error) {
          console.log(error)
        }
      }
    
  return (
 
    
    <div className='w-full flex justify-center mt-10'>
      <div className="w-full ml-10 mr-10">
        <h2 className="text-2xl font-bold mb-4">Campaign Requests</h2>
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
                <th scope="col" className="px-6 py-3">
                  Verify
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader />
              ) : (
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
                    <img src={campaign.image} alt="card image" style={{ width: '150px', height: '100px' }} className='rounded-xl' />
                  </td>
                  <td>
                    <button className='bg-green-400 w-[70%] h-10 rounded-md text-white' onClick={() => verify(campaign._id)}>
                      publish
                    </button>
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
