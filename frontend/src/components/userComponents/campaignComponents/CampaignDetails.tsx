
import { Campaign } from '../../../utils'


export interface CampaignDetailsProps{
    campaign:Campaign,
    navigate:(url:string)=>void
     
}

 const CampaignDetails = ({campaign,navigate}:CampaignDetailsProps) => {
const goal = campaign.target
const percentage: number = parseFloat(((campaign.currentAmount / goal) * 100).toFixed(1));

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
            <span className="font-bold">₹{campaign.currentAmount}</span> raised
          </label>
          <p>{percentage}%</p>
        </div>
        <div id="funding" className="w-full bg-gray-200 rounded-full dark:bg-gray-400">
        <div className="bg-green-500 h-2" style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="text-sm">{campaign.duration} days left</span>
      </div>
    </div>
  </div>
  )
}

export default CampaignDetails