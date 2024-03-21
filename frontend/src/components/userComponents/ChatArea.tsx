import React, { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  useGetChatMutation,
  useSaveChatMutation,
} from "../../redux/slices/userApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faFaceSmile,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { toast } from "react-toastify";

const socket = io(import.meta.env.VITE_SERVER_URL);



interface MessageType {
  message: string;
  userName?: string;
  image?: string;
  video?:string
}

interface CHATPROP {
  campaignId: string;
  title:string;
  groupIcon:string
}

export const ChatArea = ({ campaignId ,title,groupIcon}: CHATPROP) => {
  console.log(campaignId);

  const [message2, setMessage2] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [makeChange, setMakeChange] = useState<boolean>(false);

  const [liveChannel, setLiveChannel] = useState<string>("");

  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isTypingUserName,setIsTypingUserName] = useState<string>('')

  const addEmoji = (emoji: string) => {
    setMessage2(message2 + emoji);
  };

  const imageRef = useRef<HTMLInputElement>(null);
  const scroll = useRef<HTMLDivElement>(null);

  const triggerImage = () => {
    console.log("works");
    imageRef.current?.click();
  };

  const navigate = useNavigate();

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

    socket.on("recieveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log(messages);

      const { message, userName, image, video } = data;
      

      if (campaignId) {
        const save = async () => {
          await saveChat({
            campaignId,
            message,
            userName,
            image,
            video,
          }).unwrap();
        };
        save();
      }
    });

    return () => {
      socket.off("recieveMessage");
    };
  }, [campaignId, getChats, saveChat, userName]);

  const sendMessage = (message: string) => {
    try{
      socket.emit("message", {
        message: message,
        userName: userName,
        image: image,
        video: video,
        channel: campaignId,
        room:room
      });
      console.log("video here:", video);
      setMessage2("");
      setMakeChange(!makeChange);
      setImage("");
      setVideo("");
    }catch(error){
      console.log('error from data sendMessage:',error)
    }


  };

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: File | undefined = e.target.files?.[0];
    setFileToBase64(imageFile, setImage);
  };

  const videoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoFile: File | undefined = e.target.files?.[0];
    console.log(videoFile, "getting video file");
    setFileToBase64(videoFile, setVideo);
  };

  const filesHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectdFile = e.target.files?.[0];
      if (selectdFile?.type.startsWith("image")) {
        imageHandler(e);
      } else if (selectdFile?.type.startsWith("video")) {
        console.log("getiitnggs f");
        videoHandler(e);
      } else {
        console.log("error in filesHandler");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setFileToBase64 = async (
    file: File | undefined,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setInput(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const liveHandler = () => {
    const channel = campaignId;
    socket.emit("joinRequest", channel);
    navigate("/liveHost");
  };

  useEffect(() => {
    const handleInvite = (channel: string) => {
      setLiveChannel(channel);
      console.log("getting the call");
      console.log("channel:", channel);
    };

    socket.on("invite", handleInvite);

    return () => {
      socket.off("invite", handleInvite);
    };
  }, []);

  const joinHandler = () => {
    socket.emit("joined");
    navigate("/liveHost");
  };

  const emitTyping = async()=>{
    socket.emit('typing',{campaignId,userName})
  }

  useEffect(()=>{
    const typingDetector = (typingUserName:string)=>{
      console.log('works',typingUserName)
        setIsTypingUserName(typingUserName)
    }
    const clearTyping = ()=>{
      setTimeout(()=>{
        setIsTypingUserName('')
      },500)
    }
    socket.on('isTyping',typingDetector)
    socket.on('typingEnded',clearTyping)
    


    return ()=>{
      socket.off('isTyping',typingDetector)
      socket.off('typingEnded',clearTyping)

  
    }

  },[]) 


  useEffect(()=>{
    socket.on('res',(data)=>{
      console.log('getting the response')
      toast.success(data)
    })
  },[])

  useEffect(() => {
    // Scroll to the bottom of the chat area when messages change
    if (scroll.current) {
        scroll.current.scrollTo({
            top: scroll.current.scrollHeight,
            behavior: 'instant'
        });
    }
}, [messages]);

// useEffect(()=>{
//   const test = ()=>{
//       toast.success('joined successfully')
//   }
//   test()

//   socket.on('joined',test)

//   return ()=>{
//     socket.off('joined',test)
//   }



// },[])

const room = 'room1'


const joinRoom = async(campaignId:string)=>{
  socket.emit('join',campaignId)
}


useEffect(()=>{
  socket.on('Rmessage',(room)=>{
    toast.success(`got message in ${room}`)
  })
},[])

// useCallback(() => {
  if (campaignId) {
    console.log('cam:', campaignId);
    joinRoom(campaignId);
  }
// }, [campaignId]);

const handleKeyRelease = ()=>{
  socket.emit('ended',{campaignId})
}



  return (
    <div className="chat-area flex flex-col h-[740px] bg-gray-800 text-white w-full rounded-xl scroll-smooth">
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
            ref={scroll} 
 
          >
            {/* listing all the chats */}
            <div className="flex flex-col rounded-xl  ">
              <div className=" bg-gray-700 h-20 mb-2 top-0 sticky flex items-center">
              <div className="w-[80%] bg-gray-700 h-20 mb-2 top-0 sticky flex items-center pl-10">
                <img src={groupIcon} alt="" className='rounded-full  h-16 w-16 mt-2' />
                <span className="text-xl font-semibold ml-10 flex flex-col">
                  {title}
                  {isTypingUserName&& (
                    <span className="text-sm mt-2">{`${isTypingUserName} is typing...`}</span>
                  )}
                  {/* <div onClick={()=>joinRoom(room)}>join room</div> */}

                </span>
                </div>
                <div className="w-[20%] bg-gray-700 h-20 flex justify-center items-center" >
                {isCreator && (

                  <button
                    className=" bg-red-500 text-white font-semibold w-20 rounded-md h-10 "
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

              </div>
              {/* group title */}

              {messages.map((data, index) => (
                <div key={index} className="flex flex-col mb-2 pl-5" >
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
          {video && (
            <div className="h-auto w-96">

              <video
                src={`${video}`}
                className="w-full h-full overflow-hidden"
                autoPlay
                controls
              ></video>
            </div>
          )}
          {isLoading && <Loader />}

          {/* message input area */}
          {isVisible && (
            <span className="ml-2 z-20">
              <Picker data={data} onEmojiSelect={(e) => addEmoji(e.native)} />
            </span>
          )}

          <div className="input-area bg-gray-800 p-4 flex items-center">
            <div className="bg-gray-700 w-full rounded-md">
              <input
                type="file"
                style={{ display: "none" }}
                ref={imageRef}
                accept="image/*,video/*"
                onChange={filesHandler}
              />
              <span className="ml-3" onClick={triggerImage}>
                <FontAwesomeIcon icon={faImage} />
              </span>
              <span className="ml-3" onClick={() => setIsVisible(!isVisible)}>
                <FontAwesomeIcon icon={faFaceSmile} />
              </span>

              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 rounded-md border-none outline-none text-white bg-gray-700 mr-2"
                onChange={(e) => setMessage2(e.target.value)}
                value={message2}
                onInput={emitTyping}
                onKeyUp={handleKeyRelease}
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
