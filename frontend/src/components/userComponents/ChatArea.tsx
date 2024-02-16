import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  useGetChatMutation,
  useSaveChatMutation,
} from "../../redux/slices/userApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faImage } from "@fortawesome/free-solid-svg-icons";

const socket = io("http://localhost:8000");

interface MessageType {
  message: string;
  userName?: string;
  imageUrl?:string
}

export const ChatArea = ({ campaignId }) => {
  console.log(campaignId);

  const [message2, setMessage2] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [makeChange, setMakeChange] = useState<boolean>(false);

  const [image,setImage] = useState<string>('')

  const imageRef = useRef<HTMLInputElement>(null);

  const triggerImage = () => {
    console.log("works");
    imageRef.current?.click();
  };

  const [saveChat] = useSaveChatMutation();
  const [getChats] = useGetChatMutation();

  const userData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(userData);

  const userName: string = parsedData.result.user.name;

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
      const message = data.message
      const userName = data.userName
  

      if (campaignId) {
        const save = async () => {
          await saveChat({
            campaignId,
            message,
            userName
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
    socket.emit("send", { message: message, userName: userName ,image:image});
    setMessage2("");
    setMakeChange(!makeChange);
    setImage('')
    
  };


  const imageHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const imgFile =e.target?.files?.[0];


    const setFileToBase64 = (file: File | undefined) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log(base64String)
        setImage(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    setFileToBase64(imgFile);
 
    
  }
  


  return (
    <div className="chat-area flex flex-col h-[645px] bg-gray-800 text-white w-full rounded-md">
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
            <div className="flex flex-col m-2 ">
              {messages.map((data, index) => (
                <div key={index} className="flex flex-col mb-2">
                    {data.imageUrl?(
                      <div><img src={data.imageUrl} alt="" /></div>
                    ):(
                      <div className="text-sm font-semibold text-gray-300">
                        {data.message}
                  </div>

                    )}

                  <div className="bg-blue-300 rounded-md py-2 px-4 max-w-[80%] self-start">
                    {data.message}
                  </div>
                </div>
              ))}

              {/* Add more chat messages here */}
            </div>
          </div>
          {image&&(
                <div className="h-auto w-96"><img src={`${image}`} alt="image" className="w-full h-full overflow-hidden"/></div>
              )

              }
          <div className="input-area bg-gray-800 p-4 flex items-center">
        
            <div className="bg-gray-700 w-full rounded-md">
            
              <input type="file" style={{ display: "none" }} ref={imageRef} accept="image/*" onChange={imageHandler} />
              <span className="ml-3" onClick={triggerImage}>
                <FontAwesomeIcon icon={faImage} />
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
