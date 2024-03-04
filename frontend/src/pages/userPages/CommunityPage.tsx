import React, { useState } from "react";
import { Channels } from "../../components/userComponents/Channels";

import { ChatArea } from "../../components/userComponents/ChatArea";
import { CreatorLiveComponent } from "../../components/creatorComponents/CreatorLiveComponent";

export const CommunityPage = () => {
  const userData = localStorage.getItem("userInfo");

  const [id, setId] = useState<string>("");
  const [isLive,setIsLive] = useState<boolean>(false)

  const channelProp = (value: string) => {
    setId(value);
  };

  const handleLiveClick = async()=>{
    setIsLive(!isLive)
  }
  
  return (
    <>
      {userData ? (
        isLive ? (
          <div>
           <CreatorLiveComponent isLive={isLive}/>
          </div>
        ) : (
          <div className="bg-[#0c0c0c] min-h-screen ">
            <div className="flex w-full space-x-2 ">
              <Channels callback={channelProp} />
              <ChatArea campaignId={id} handleLive={handleLiveClick} />
            </div>
          </div>
        )
      ) : (
        <div className="bg-[#0c0c0c] min-h-screen">
          <div className="flex w-full space-x-2">
            <span className="text-white text-3xl">Sign in to contribute</span>
          </div>
        </div>
      )}
    </>
  );
  
};
