import { useEffect, useState } from "react";
import { useGetCampaignsMutation } from "../../redux/slices/userApiSlice";
import { ExploreCard } from "./ExploreCard";
import { PriceBar } from "./PriceBar";

interface Campaign {
  _id: string;
  campaignName: string;
  category: string;
  story: string;
  image: string;
  goal: number;
  endDate: string;
  userEmail: string;

}

export const Content = () => {

  const [campaigns,setCampaigns] = useState<Campaign[]>([])

  const [getCampaign] = useGetCampaignsMutation()

  useEffect(()=>{
    const list = async()=>{
      try{
    const data  = await getCampaign('')
    console.log(data,'data')
    const list = data.data.list
    setCampaigns(list)
      }catch(error){
        console.log(error)
      }
    }
    list()
 
  },[])
console.log(campaigns)

  return (
    <div className="bg-gray-800">
      {/* <!-- Main --> */}
      <div className="max-w-full h-full flex relative overflow-y-hidden mr-7 flex-col bg-gray-800">
        <div className="">
          <PriceBar />
        </div>

       <div className="mt-2">
       <ExploreCard />
       </div>

       {/* campaign lists */}
       <div className="w-full h-[1000px] flex bg-gray-800 mt-5 space-x-9">
      
      {campaigns.map((campaign) => (
        <div className="w-80 rounded overflow-hidden shadow-xl bg-white h-[400px] mt-8">
        <img className="w-full" src={campaign.image} alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <h4>{campaign.category}</h4>
          <div className="font-bold text-xl mb-2" >{campaign.campaignName}</div>
          <p className="text-gray-700 text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
            {campaign.story}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <h3>0.0 raised</h3>
          <h3>23 days left</h3>
        </div>
        <div className="px-6 pt-4 pb-2">
        <p>Goal:-{campaign.goal}</p>
      
        </div>
      </div>
      ))}
   
        
 


       </div>

      </div>
    </div>
  );
};
