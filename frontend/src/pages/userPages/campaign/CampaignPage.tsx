
import { CampaignSidbar } from '../../../components/userComponents/campaignComponents/CampaignSidbar'
import { Basics } from '../../../components/userComponents/campaignComponents/Basics'
import { Advanced } from '../../../components/userComponents/campaignComponents/Advanced'
import { useLocation } from 'react-router-dom'
import { Rewards } from '../../../components/userComponents/campaignComponents/Rewards'

export const CampaignPage = () => {

  const location = useLocation()
  const path = location.pathname
  return (
  <div className='bg-gray-500 flex ' >
    <div className='w-72 bg-green-300 fixed h-screen'>
      <CampaignSidbar/>
    </div>
    <div className='ml-72 h-screen bg-gray-800 w-full pl-20 pt-10 flex flex-col overflow-y-auto'>
    {path =='/create-campaign' ? (<Basics/>): path =='/create-campaign/advanced' ? (<Advanced/>):path =='/create-campaign/reward' ?(<Rewards/>):null}
    </div>
  </div>
  )
}
