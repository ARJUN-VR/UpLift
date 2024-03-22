import { Suspense, lazy, useEffect, useState } from "react"
import { Campaign } from "../../utils"
import { useGetCategoryMutation } from "../../redux/slices/userApiSlice"
import { useNavigate, useParams } from "react-router-dom"

const CampaignDetails = lazy(()=> import('../userComponents/campaignComponents/CampaignDetails'))

export const Category = () => {
  const [campaigns,setCampaigns] = useState<Campaign[]>([])

  const navigate = useNavigate()

  const {cat} = useParams()
  const pass = cat?.slice(1)

  const [getCategory] = useGetCategoryMutation()


  useEffect(() => {
    const list = async () => {
      try {
        const details = await getCategory(pass).unwrap();
        const list = details.list
        setCampaigns(list);
      } catch (error) {
        console.log(error);
      }
    };
    list();
  }, []);

  return (
    <div className=" flex  mr-7 l bg-[#0c0c0c] ml-3 text-white">
    {/* campaign lists */}
    <div className="w-full flex bg-[#0c0c0c] mt-5  flex-wrap space-x-4 mb-10">
      {campaigns.map((campaign) => (
       <Suspense key={campaign._id} fallback={<div>Loading...</div>}>
        <CampaignDetails campaign={campaign} navigate={navigate}/>
       </Suspense>
      ))}
    </div>
  </div>
  )
}
