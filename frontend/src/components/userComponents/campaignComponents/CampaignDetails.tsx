
import { Campaign } from '../../../utils'


interface CampaignDetailsProps{
    campaign:Campaign,
    navigate:(url:string)=>void
     
}

 const CampaignDetails = ({campaign,navigate}:CampaignDetailsProps) => {
  return (
    <div className="w-56 rounded overflow-hidden shadow-xl bg-[#16141c] h-[340px] mt-8" onClick={() => navigate(`/campaign/:${campaign._id}`)}>
    <img className="w-full" src={campaign.image} alt="Sunset in the mountains" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 line-clamp-1">{campaign.title}</div>
      <span className="text-gray-400 font-bold">{campaign.category}</span>
      <p className="text-gray-300 text-sm line-clamp-2">{campaign.tagline}</p>
    </div>
    <div className="px-6 pb-2 flex justify-between">
      <div className="w-full">
        <div className="flex justify-between">
          <label htmlFor="funding">
            <span className="font-bold">₹54,000</span> raised
          </label>
          <p>45%</p>
        </div>
        <div id="funding" className="w-full bg-gray-200 rounded-full dark:bg-gray-400">
          <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%] h-2"></div>
        </div>
        <span className="text-sm">20 days left</span>
      </div>
    </div>
  </div>
  )
}

export default CampaignDetails