import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  useGetChatMutation,
  useSaveChatMutation,
} from "../../redux/slices/userApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const socket = io("http://localhost:8000");

interface MessageType {
  message: string;
  userName?: string;
  image?: string;
}

interface CHATPROP{
  campaignId:string
}


export const ChatArea = ({ campaignId}:CHATPROP) => {
  console.log(campaignId);

  const [message2, setMessage2] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [makeChange, setMakeChange] = useState<boolean>(false);

  const [liveChannel, setLiveChannel] = useState<string>("");

  const [image, setImage] = useState<string>("");

  const [isVisible,setIsVisible] = useState<boolean>(false)

 

  const addEmoji = (emoji:string)=>{
    setMessage2(message2 + emoji)
  }



  const imageRef = useRef<HTMLInputElement>(null);

  const triggerImage = () => {
    console.log("works");
    imageRef.current?.click();
  };

  const navigate = useNavigate()



  const [saveChat] = useSaveChatMutation();
  const [getChats, { isLoading }] = useGetChatMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const isCreator: boolean = userInfo.result.user.isCreator;

  const userName: string = userInfo.result.user.name;

  let isChat: string = "";
  if (campaignId) {
    isChat = campaignId;
  }

  useEffect(() => {
    const fetchChats = async () => {
      const chatRes = await getChats(campaignId).unwrap();

      setMessages(chatRes.data);
    };

    fetchChats();

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log(messages);
      const message = data.message;
      const userName = data.userName;
      const image = data.image;

      if (campaignId) {
        const save = async () => {
          await saveChat({
            campaignId,
            message,
            userName,
            image,
          }).unwrap();
        };
        save();
      }
    });

    return () => {
      socket.off("message");
    };
  }, [campaignId, getChats, saveChat, userName]);

  const sendMessage = (message: string) => {
    socket.emit("send", {
      message: message,
      userName: userName,
      image: image,
      channel: campaignId,
    });
    setMessage2("");
    setMakeChange(!makeChange);
    setImage("");
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target?.files?.[0];
    if(imgFile?.type.startsWith('image')){
      console.log('its an image')
    }else{
      console.log('its a video')
    }

    const setFileToBase64 = (file: File | undefined) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    setFileToBase64(imgFile);
  };

  const liveHandler = () => {
    const channel = campaignId;
    socket.emit("joinRequest", channel);
    navigate('/liveHost')
    
  };

  useEffect(() => {
    const handleInvite = (channel: string) => {
      setLiveChannel(channel);
      console.log('getting the call')
      console.log('channel:',channel)
    }

    socket.on("invite", handleInvite);
  

    return () => {
      socket.off("invite", handleInvite);
    };
  }, []);

  const joinHandler = () => {
    socket.emit("joined");
    navigate('/liveHost');
  };

  return (
    <div className="chat-area flex flex-col h-[740px] bg-gray-800 text-white w-full rounded-xl">
      {/* chat list */}
      {isChat ? (
        <>
          <div
            className="messages flex-grow overflow-auto "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            {/* listing all the chats */}
            <div className="flex flex-col rounded-xl ">
              {/* group title */}
              <div className="w-full bg-gray-700 h-20 mb-2 top-0 sticky flex items-center  pl-20 justify-between">
                <span className="text-xl font-semibold">
                  modue: Next-Gen Modular
                </span>
                {isCreator && (
                  <button
                    className="mr-20 bg-red-500 text-white font-semibold w-20 rounded-md h-10"
                    onClick={liveHandler}
                  >
                    Go live
                  </button>
                )}
                {liveChannel == campaignId && (
                  <span
                    className="mr-20 h-10 text-red-400"
                    id="live"
                    onClick={joinHandler}
                  >
                    creator on live
                  </span>
                )}
              </div>
              {messages.map((data, index) => (
                <div key={index} className="flex flex-col mb-2">
                  {data.image ? (
                    <div className="bg-gray-600 rounded-md  max-w-[80%] self-start">
                      <div className="text-sm font-semibold text-gray-200 py-1">
                        {data.userName}
                      </div>
                      <img src={data.image} alt="" />
                      {data.message && (
                        <span className="text-black">{data.message}</span>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="text-sm font-semibold text-gray-300">
                        {data.userName}
                      </div>
                      <div className="bg-blue-300 rounded-md py-2 px-4 max-w-[80%] self-start">
                        {data.message}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* selected image div */}
          {image && (
            <div className="h-auto w-96">
              <img
                src={`${image}`}
                alt="image"
                className="w-full h-full overflow-hidden"
              />
            </div>
          )}
          {isLoading && <Loader />}

          {/* message input area */}
          {
            isVisible &&(
              <span className="ml-2 z-20">
              <Picker data={data} onEmojiSelect={(e)=>addEmoji(e.native)}/>
              </span>
            )
          }

          <div className="input-area bg-gray-800 p-4 flex items-center">
            <div className="bg-gray-700 w-full rounded-md">
              <input
                type="file"
                style={{ display: "none" }}
                ref={imageRef}
                accept="image/*,video/*"
                onChange={imageHandler}
              />
              <span className="ml-3" onClick={triggerImage}>
                <FontAwesomeIcon icon={faImage} />
              </span>
              <span className="ml-3" onClick={()=>setIsVisible(!isVisible)}>
              <FontAwesomeIcon icon={faFaceSmile} />

              </span>
 
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 rounded-md border-none outline-none text-white bg-gray-700 mr-2"
                onChange={(e) => setMessage2(e.target.value)}
                value={message2}
              />
            </div>



            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white ml-3"
              onClick={() => {
                sendMessage(message2);
              }}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        // initial page view
        <div className="flex flex-col my-56 items-center ">
          <span className="text-3xl font-semibold text-gray-300">
            <FontAwesomeIcon icon={faComment} size="3x" />
          </span>

          <span className="text-xl font-semibold text-gray-300">
            send messages with backers using uplift chats.
          </span>
        </div>
      )}
    </div>
  );
};
