import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSaveChatMutation } from "../../redux/slices/userApiSlice";

const socket = io("http://localhost:8000");

interface MessageType {
  message: string;
  user?: string;
}

export const ChatArea = ({ campaignId }) => {


  const [message2, setMessage2] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [saveChat] = useSaveChatMutation();

  const userData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(userData);

  const userName: string = parsedData.result.user.name;

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
     const message = data.message
    

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
  }, []);



  const sendMessage = (message: string) => {
    socket.emit("send", { message });
    setMessage2('')
    
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
          {messages.map((data) => (
            <div className="bg-blue-300 rounded-md py-2 px-4 mb-2 self-start max-w-[80%]">
              {data.message}
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
