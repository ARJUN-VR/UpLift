import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

interface LIVEPROP {
  isLive: boolean;
}

const socket = io("http://localhost:8000");

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
}


export const CreatorLiveComponent = ({ isLive }: LIVEPROP) => {
  const [localStream, setLocalStream] = useState<
    MediaStream | undefined | null
  >();



  useEffect(() => {
    socket.on("newjoin", handleJoin);

    return () => {
      socket.off("newjoin", handleJoin);
    };
  });

  const videoRef = useRef(null);

  const getLocalData = async () => {
    try {
      const stream: MediaStream | null =
        await navigator.mediaDevices.getUserMedia({ video: true });
      setLocalStream(stream);
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  if (isLive) {
    useEffect(() => {
      getLocalData();
    }, []);
  }

  const createPeerConnection = async()=>{
    const peerConnection = new RTCPeerConnection(servers)
    localStream?.getTracks().forEach((track)=>{
        peerConnection.addTrack(track,localStream)
    })
  }



  const createOffer = async()=>{
    await createPeerConnection()
  }

  const handleJoin = async() => {
    console.log("new user joined");
    await createOffer()

  };

  return (
    <div className="bg-gray-900 flex flex-col">
      {localStream && (
        <div className="w-[50%] ml-20">
          <video ref={videoRef} autoPlay className="w-full h-screen" />
        </div>
      )}
    </div>
  );
};
