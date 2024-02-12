import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  useGetChatMutation,
  useSaveChatMutation,
} from "../../redux/slices/userApiSlice";

const socket = io("http://localhost:8000");

interface MessageType {
  message: string;
  userName?: string;
}

export const ChatArea = ({ campaignId }) => {
  console.log(campaignId);

  const [message2, setMessage2] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
 
  const [saveChat] = useSaveChatMutation();
  const [getChats] = useGetChatMutation();

  const userData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(userData);

  const userName: string = parsedData.result.user.name;

  useEffect(() => {
    const fetchChats = async () => {
      const chatRes = await getChats(campaignId).unwrap();

      setMessages(chatRes.data);
      console.log(chatRes)
 
    };

    fetchChats();

   

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
      const message = data.message;

      if (campaignId) {
        const save = async () => {
          const res = await saveChat({
            campaignId,
            message,
            userName,
          }).unwrap();
        };
        save();
      }
    });

   

    return () => {
      socket.off("message");
    };
  }, [campaignId,getChats,saveChat,userName]);
  

  const sendMessage = (message: string) => {
    socket.emit("send", { message });
    setMessage2("");
  };

  return (
    <div className="chat-area flex flex-col h-[645px] bg-gray-800 text-white w-full rounded-md">
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
    <div className="text-sm font-semibold text-gray-300">{data.userName}</div>
    <div className="bg-blue-300 rounded-md py-2 px-4 max-w-[80%] self-start">{data.message}</div>
  </div>
))}


          {/* Add more chat messages here */}
        </div>
      </div>
      <div className="input-area bg-gray-800 p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 rounded-md border-none outline-none text-white bg-gray-700 mr-2"
          onChange={(e) => setMessage2(e.target.value)}
          value={message2}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
          onClick={() => {
            sendMessage(message2);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
