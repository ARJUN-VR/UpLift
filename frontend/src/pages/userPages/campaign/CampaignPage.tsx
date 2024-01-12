
import { CampaignSidbar } from '../../../components/userComponents/campaignComponents/CampaignSidbar'
import { Basics } from '../../../components/userComponents/campaignComponents/Basics'

export const CampaignPage = () => {
  return (
  <div className='bg-gray-500 flex ' >
    <div className='w-72 bg-green-300 fixed h-screen'>
      <CampaignSidbar/>
    </div>
    <div className='ml-72 h-screen bg-gray-800 w-full pl-20 pt-10 flex flex-col overflow-y-auto'>
      <Basics/>
    </div>
  </div>
  )
}
