import { useEffect, useState } from "react"
import { Campaign } from "../../utils"
import { useGetCategoryMutation } from "../../redux/slices/userApiSlice"
import { useNavigate, useParams } from "react-router-dom"

export const Category = () => {
  const [campaigns,setCampaigns] = useState<Campaign[]>([])

  const navigate = useNavigate()

  const {cat} = useParams()
  const pass = cat?.slice(1)

  const [getCategory,{isLoading}] = useGetCategoryMutation()


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
        <div className="w-56  rounded overflow-hidden shadow-xl bg-[#16141c] h-[340px] mt-8" onClick={()=>navigate(`/campaign/:${campaign._id}`)}>
          <img
            className="w-full"
            src={campaign.image}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{campaign.title}</div>
            <span className="text-gray-400 font-bold">
              {campaign.category}
            </span>
            <p className="text-gray-300 text-sm">{campaign.tagline}</p>
          </div>
          <div className="px-6  pb-2 flex justify-between">
            <div className="w-full">
              <div className="flex justify-between">
                <label htmlFor="funding">
                  <span className="font-bold">₹54,000</span> raised
                </label>
                <p>45%</p>
              </div>
              <div
                id="funding"
                className="w-full bg-gray-200 rounded-full dark:bg-gray-400"
              >
                <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%] h-2"></div>
              </div>
              <span className="text-sm">20 days left</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
