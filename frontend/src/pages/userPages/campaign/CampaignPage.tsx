
import { CampaignSidbar } from '../../../components/userComponents/campaignComponents/CampaignSidbar'
import { Basics } from '../../../components/userComponents/campaignComponents/Basics'
import { Advanced } from '../../../components/userComponents/campaignComponents/Advanced'
import { useLocation } from 'react-router-dom'
import { Rewards } from '../../../components/userComponents/campaignComponents/Rewards'
import { Draft } from '../../../components/userComponents/campaignComponents/Draft'

export const CampaignPage = () => {

  const location = useLocation()
  const path = location.pathname
  return (
  <div className='bg-gray-500 flex bottom-0 ' >
    <div className='w-72 bg-green-300 fixed'>
      <CampaignSidbar/>
    </div>
    <div className='ml-72 bg-gray-800 w-full pl-20 pt-10 flex flex-col'>
    {path =='/create-campaign' ? (<Basics/>): path =='/create-campaign/advanced' ? (<Advanced/>):path =='/create-campaign/reward' ?(<Rewards/>):path=='/create-campaign/draft' ?(<Draft/>):null}
    </div>
  </div>
  )
}
