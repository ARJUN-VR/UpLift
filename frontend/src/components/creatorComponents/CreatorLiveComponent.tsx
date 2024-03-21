import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const socket = io(import.meta.env.VITE_SERVER_URL);

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export interface MessagesInterface  {
  userName:string;
  message:string;
  formattedTime:number;

}

export const CreatorLiveComponent = () => {

  const [localStream,setLocalStream] = useState<MediaStream>()
  const [message,setMessage] = useState<string>('')
  const [messages,setMessages] = useState<MessagesInterface[]>([])



  


  const { userInfo } = useSelector((state: RootState) => state.auth);

  const userName: string = userInfo.result.user.name;

  const isCreator: boolean = userInfo.result.user.isCreator;
  // let isCreator = false
  // isCreator = userInfo.result.user.isCreator;
  // console.log(isCreator)


  let peerConnection:RTCPeerConnection|undefined;
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLocalStream(stream);
      } catch (error) {
        // Handle errors if any
        console.error('Error accessing media:', error);
      }
    };
  
    getMedia(); // Call getMedia only if isCreator is true
  }, []); // <-- Empty dependency array to run this effect only once when component mounts
  
  
  useEffect(()=>{
    const callHandler = async(event)=>{
      try {
     
          if(event.type=='candidate'){
            if(peerConnection){
              console.log('entering...')
              peerConnection.addIceCandidate(event.data)
            }

          }else if(event.type == 'offer'){
            await createAnswer(event.data)
          }else if(event.type == 'answer'){
            await addAnwer(event.data)
          }
        
      } catch (error) {
        console.log('error',error)
        
      }
    
    }
    socket.on('callSent',callHandler)
    return ()=>{
      socket.off('callSent',callHandler)
    }
  },[])



  useEffect(() => {
    socket.on("newjoin", handleJoin);

    return () => {
      socket.off("newjoin", handleJoin);
    };
  }, []);
 let remoteStream:MediaStream;


  const createPeerConnection = async()=>{
    peerConnection = new RTCPeerConnection(servers)
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})

    remoteStream = new MediaStream()


  
    if(remoteVideoRef.current){
      remoteVideoRef.current.srcObject = remoteStream
    }

    stream?.getTracks().forEach((track)=>{
      peerConnection?.addTrack(track,stream)
      console.log('tr:',track)
    })

    peerConnection.ontrack = (event)=>{
      event.streams[0].getTracks().forEach((track)=>{
        console.log('tracks:',track)

        console.log('inside:',remoteStream)
        remoteStream.addTrack(track)
      })
    }


    peerConnection.onicecandidate = async(event)=>{
      if(event.candidate){
        try{
          socket.emit('call',{type:'candidate',data:event.candidate})
        }catch(error){
          console.log('errror on ice',error)
        }
      }
    }


  }

  const createOffer = async () => {
    try{
      await createPeerConnection();

      const offer = await peerConnection?.createOffer()
      console.log('offer:',offer)
      if(offer){
        await peerConnection?.setLocalDescription(offer)
        console.log('after offer peer:',peerConnection)
        console.log('offer:',offer)
        socket.emit('call',{type:'offer',data:offer})
      }
    }catch(error){
      console.log('error on offer:',error)
    }
  };


  const createAnswer = async(offer:RTCSessionDescriptionInit)=>{
    try {
      await createPeerConnection()

      await peerConnection?.setRemoteDescription(offer)

      const answer = await peerConnection?.createAnswer()
      console.log('answer:',answer)
      await peerConnection?.setLocalDescription(answer)
      console.log('localdescription:',peerConnection?.localDescription)

      socket.emit('call',{type:'answer',data:answer})
      
    } catch (error) {
      console.log('error on answer:',error)
      
    }
  }

  const addAnwer = async(answer:RTCSessionDescriptionInit)=>{
    try {
      if(!peerConnection?.currentRemoteDescription){
        peerConnection?.setRemoteDescription(answer)
        console.log('peerConnection:',peerConnection)
        console.log('sucess')
      }
      
    } catch (error) {
      console.log('error on adding answer',error)
      
    }
  }

  const handleJoin =async()=>{
    await createOffer()
  }

  const liveMessageHandler = async () => {
    try {
      const time = new Date(); // Create a new Date object for the current time
      const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // This ensures that the time is displayed in 12-hour format with AM/PM
      });
  
      socket.emit('liveMessage', { message, userName, formattedTime });
      setMessage('');
  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const chatBundler = async(data:MessagesInterface)=>{
      setMessages((prev)=>[...prev,data])
    }
    socket.on('incoming',chatBundler)

    return ()=>{
      socket.off('incoming',chatBundler)
    }
  },[])
 

  const naviagate = useNavigate()

  const handleEndlive = ()=>{
    if(localStream){
      localStream.getTracks().forEach(track => track.stop())
    }
    socket.emit('leave')
    
    naviagate(-1)
    setTimeout(()=>{
      window.location.reload()
    },200)

    toast.info('live has ended')

  }

  

  useEffect(()=>{
    const leaveHandler = ()=>{
      if(localStream){
        localStream.getTracks().forEach(track => track.stop())
      }

      naviagate(-1)
      setTimeout(()=>{
        window.location.reload()
      },200)

    toast.info('live has ended')


    }
    socket.on('leaveSent',leaveHandler)

    return ()=>{

      socket.off('leaveHandler',leaveHandler)
    }
  },[])






  return (
<div className="bg-gray-900 flex flex-row h-screen">
  {/* Live video section */}
  <div className="relative flex-grow">
    {/* Viewers count */}
    {/* <div className="absolute top-2 right-10 mt-5 text-white bg-blue-500 h-10 rounded-lg w-28 flex justify-center items-center">Viewers: {viewersCount}</div> */}
    <div className="flex justify-center items-center h-full p-5">
    
     {localStream && (
        <video ref={videoRef} autoPlay className="w-full h-full">
          Your browser does not support the video tag.
        </video>
      )}
          {/* </>
        ):(
          <>
                   <video ref={remoteVideoRef} autoPlay className="w-full h-full">
                   Your browser does not support the video tag.
                 </video>
                
    

          </> */}
   
 
    </div>
    {/* End Live button */}
    {
      isCreator &&(
        <button className="absolute top-2 left-16 mt-5 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleEndlive} >End Live</button>

      )
    }
  </div>

  {/* Live chat section */}
  <div className="w-1/3 bg-gray-900 flex flex-col">
    {/* Add your live chat component or content here */}
    <h1 className="text-center text-white font-semibold text-3xl mt-3">Live Chat</h1>
    <div className="flex-grow h-full overflow-auto">
      {/* Messages */}
      {messages.map((data, index) => (
        <div key={index} className="flex flex-col p-3 rounded-lg mb-2">
  <div className="flex justify-between">
    <span className="text-blue-500 font-semibold">{data.userName}</span>
    <span className="text-gray-400">{data.formattedTime}</span>
  </div>
  <span className="text-gray-200">{data.message}</span>
</div>


      ))}
    </div>
    {/* Typing area */}
    <div className="flex items-center mt-4 mb-3">
      <input type="text" className="flex-1 rounded-md border border-gray-600 px-4 py-2 mr-2 bg-gray-800 text-white" placeholder="Type your message..." onChange={(e)=>setMessage(e.target.value)} value={message} />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={liveMessageHandler}>Send</button>
    </div>
  </div>
</div>

  
  );
};
