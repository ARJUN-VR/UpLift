import { Suspense, lazy, useEffect, useState } from "react";
import { useGetCampaignsMutation } from "../../redux/slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { Carousel } from "./Carousel";
import { ExploreCard } from "./ExploreCard";

export interface Campaign {
  _id: string;
  title: string;
  tagline: string;
  category: string;
  story: string;
  image: string;
  target: number;
  duration: string;
  location: string;
  userEmail: string;
}
const CampaignDetails = lazy(
  () => import("../userComponents/campaignComponents/CampaignDetails")
);

export const Content = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [getCampaign] = useGetCampaignsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const list = async () => {
      try {
        const details = await getCampaign("");
        const list = details.data.basicDetails;
        setCampaigns(list);
      } catch (error) {
        console.log(error);
      }
    };
    list();
  }, []);

  return (
    <>
      <div className=" flex bg-[#0c0c0c] rounded-xl h-[500px] w-full">
        <div className="w-[80%] bg-[#0c0c0c] rounded-xl h-full">
          <Carousel />
        </div>
        <ExploreCard />
      </div>

      <div className=" flex  mr-7 l bg-[#0c0c0c] ml-3 text-white">
        {/* campaign lists */}
        <div className="w-full flex bg-[#0c0c0c] mt-5  flex-wrap space-x-4 mb-10">
          {campaigns.map((campaign) => (
            <Suspense key={campaign._id} fallback={<div>Loading...</div>}>
              <CampaignDetails campaign={campaign} navigate={navigate} />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
};
