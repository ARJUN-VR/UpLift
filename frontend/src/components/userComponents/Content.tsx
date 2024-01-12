import { useEffect, useState } from "react";
import { useGetCampaignsMutation } from "../../redux/slices/userApiSlice";
import { ExploreCard } from "./ExploreCard";


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
     

       <div className="mt-2">
       <ExploreCard />
       </div>

       {/* campaign lists */}
       <div className="w-full h-[1000px] flex bg-gray-800 mt-5 space-x-9">
      
      {campaigns.map((campaign) => (
        <div className="w-72 rounded overflow-hidden shadow-xl bg-white h-[400px] mt-8">
        <img className="w-full" src={campaign.image} alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2" >{campaign.campaignName}</div>
          <span className="text-gray-500 font-bold">{campaign.category}</span>
          <p className="text-gray-700 text-sm">
            {campaign.story}
          </p>
        </div>
        <div className="px-6  pb-2 flex justify-between">
          

<div className="w-full">
  <div className="flex justify-between">
  <label htmlFor="funding" ><span className="font-bold">₹54,000</span> raised</label>
  <p>45%</p>

  </div>
<div id="funding" className="w-full bg-gray-200 rounded-full dark:bg-gray-400">    
    <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%] h-2"></div>
  </div>
  <span className="text-sm">20 days left</span>
</div>

        </div>
      </div>
      ))}
   
       </div>

      </div>
    </div>
  );
};
