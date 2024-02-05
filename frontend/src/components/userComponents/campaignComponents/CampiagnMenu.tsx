import React, { useEffect, useState } from "react";
import { useGetCampaignMutation } from "../../../redux/slices/userApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CommentBox } from "./CommentBox";
import { Payment } from "../Payment";

export const CampiagnMenu = () => {
  const [title, setTitle] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [goal, setGoal] = useState<number>(100000);
  const [backers, setBackers] = useState<number>(0);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [story, setStory] = useState<string>('')

  const [modal,setModal] = useState<boolean>(false)

  const [active, setActive] = useState<boolean>(true);

  const [campaignid, setCampaignid] = useState<string>('')

  const [GetCampaign, { isLoading }] = useGetCampaignMutation();

  let campaignId: string | undefined;

  const { id } = useParams();

  const basicId = localStorage.getItem("basicId");

  if (id) {
    campaignId = id?.slice(1);
  } else if (basicId) {
    campaignId = basicId;
  }

  useEffect(() => {
    const getCampaign = async () => {
      try {
        const campData = await GetCampaign(campaignId);
        localStorage.removeItem("basicId");
        const advancedData = campData?.data?.campaign[0].advancedData[0];
        const rewardData = campData.data.campaign[0].rewardData[0];

        setTitle(campData?.data?.campaign[0].title);
        setTagline(campData?.data?.campaign[0].tagline);
        setGoal(campData?.data?.campaign[0].target);
        setCurrentAmount(rewardData.pledgeAmount);
        setBackers(rewardData.claims);
        setDate(campData?.data?.campaign[0].duration);
        setVideo(advancedData?.video);
        setThumbnail(advancedData?.thumbnail);
        setStory(advancedData?.story)
        setCampaignid(campData?.data?.campaign[0]._id)
      } catch (error) {
        // toast.error("error in campaignmenu");
        console.log(error);
      }
    };
    getCampaign();
  }, [GetCampaign, id]);

  


  const closeModal = ()=>{
    setModal(false)
  }




  return (
    <>
      <div className="w-full flex flex-col items-center font-bold text-white pr-5">
        <span className="text-3xl">{title}</span>
        <span className="text-xl font-normal pt-2">{tagline}</span>
      </div>
      <div className="w-full  flex mt-4">
        {/* video container */}
        <div className="w-2/3">
          <video
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            controls
            src={video}
            poster={thumbnail}
          >
            <source type="video/mp4" />
          </video>
        </div>
        {modal ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <Payment close={closeModal} name={title} desc={tagline}/>
          </div>
        ):(
<>
</>
        )}
        {/* details area */}
        <div className="w-1/3 flex  flex-col  pl-10 pr-5">
          {/* funding bar */}
          <div className="bg-gray-300 w-[90%] h-2">
            <div className="bg-green-500 w-[45%] h-full"></div>
          </div>
          {/* goal */}
          <span className="text-2xl font-bold text-green-500 pt-2">
            ₹RS.{currentAmount}
          </span>
          <span className="text-medium font-semibold text-white ">
            pledged of ₹RS.{goal}
          </span>
          {/* backers */}
          <span className="text-2xl font-bold text-white  pt-5">{backers}</span>
          <span className="text-large font-bold text-white">Backers</span>
          {/* days to go */}
          <span className="text-2xl font-bold text-white  pt-5">{date}</span>
          <span className="text-large font-bold text-white">days to go</span>
          {/* notice */}
          <span className="text-sm font-bold text-gray-200 pt-10">
            All or nothing. This project will only be funded if it reaches its
            goal by Tue, February 20 2024 3:30 AM UTC +05:30.
          </span>

          {/* pledge */}
          <button className="w-[90%] bg-green-400  h-12 mt-auto text-white" onClick={()=>setModal(!modal)}>
            Back this project
          </button>
          
        </div>
      </div>

      {/* footer area */}

      {active ? (
        <>
        <div className="w-full  h-10 mt-10 space-x-10">
          <button
            className="border-b text-white font-bold py-2 px-4 rounded"
            onClick={() => setActive(true)}
          >
            story
          </button>

          <button
            className=" text-white font-bold py-2 px-4 rounded"
            onClick={() => setActive(false)}
          >
            comments
          </button>
        </div>
           
           <p className="text-white pt-5 pb-52">{story}</p>
           </>
       
      ) : (
        <>
        <div className="w-full  h-10 mt-10 space-x-10">
          <button
            className=" text-white font-bold py-2 px-4 rounded"
            onClick={() => setActive(true)}
          >
            story
          </button>

          <button
            className="border-b text-white font-bold py-2 px-4 rounded"
            onClick={() => setActive(false)}
          >
            comments
          </button>
        </div>

        {/* comment section */}
      <CommentBox campaignid={campaignid}/>
        </>
      )}
   
    
    </>
  );
};


