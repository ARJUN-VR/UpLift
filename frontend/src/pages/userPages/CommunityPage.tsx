import  { useState } from "react";
import { Channels } from "../../components/userComponents/Channels";

import { ChatArea } from "../../components/userComponents/ChatArea";
import { io } from "socket.io-client";


const socket = io("http://localhost:8000");


export const CommunityPage = () => {
  const userData = localStorage.getItem("userInfo");

  const [id, setId] = useState<string>("");
  const [title,setTitle] = useState<string>('')
  const [groupIcon,setGroupIcon] = useState<string>('')


  const channelProp = (id:string,title:string,image:string) => {
    setId(id);
    setTitle(title)
    setGroupIcon(image)
  };

  
  return (
    <>
      {userData ? (
       
          <div className="bg-[#0c0c0c] min-h-screen ">
            <div className="flex w-full space-x-2 ">
              <Channels callback={channelProp} />
              <ChatArea campaignId={id} groupIcon={groupIcon} title={title}/>
            </div>
          </div>
      
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
