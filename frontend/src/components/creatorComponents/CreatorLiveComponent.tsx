import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export const CreatorLiveComponent = () => {

  const [localStream,setLocalStream] = useState<MediaStream>()

  let peerConnection:RTCPeerConnection|undefined;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(()=>{
    const getMedia = async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
      if(videoRef.current){
        videoRef.current.srcObject = stream
      }
      setLocalStream(stream)
    }
    getMedia()
  },[])

  console.log('stream:',localStream)

  useEffect(() => {
    socket.on("newjoin", handleJoin);

    return () => {
      socket.off("newjoin", handleJoin);
    };
  }, []);

  const createPeerConnection = async()=>{
    peerConnection = new RTCPeerConnection(servers)
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    console.log('test stream:',stream)

    if(stream){
      console.log('getting in')
      const tracks = stream.getTracks()
      console.log('tracks:',tracks)

      tracks.forEach((track)=>{
        peerConnection?.addTrack(track,stream)
      })
    }
   

  }

  const createOffer = async () => {
   
      await createPeerConnection();
   
  };

  const handleJoin =async()=>{
    await createOffer()
  }
 
  

  return (
    <div className="bg-gray-900 flex flex-col h-screen">
      <div className="flex justify-center items-center h-full">
        {localStream && (
          <video ref={videoRef} autoPlay className="w-full h-full">
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};
