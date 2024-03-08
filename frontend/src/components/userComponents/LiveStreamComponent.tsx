import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const LiveStreamComponent = () => {
  const [remoteStream,setRemoteStream] = useState<MediaStream|null>(null)

  const socket = io("http://localhost:8000");

  const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
}

useEffect(()=>{
 
  socket.on('offersent',(offer)=>{

    handleOffer(offer)

  })
  return ()=>{
    socket.off('offer',handleOffer)
  }
},[])

const handleOffer =async(offer:RTCSessionDescriptionInit)=>{
  try {
    console.log('offer:',offer)
    const peerConnection = new RTCPeerConnection(servers)
    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    socket.emit('answer',answer)
    peerConnection.onicecandidate= (event)=>{
      if(event.candidate){
        socket.emit('ice',event.candidate)
      }
    }

    peerConnection.ontrack= (event)=>{
      setRemoteStream(event.streams[0])
    }


  } catch (error) {
    console.log(error)
  }

}
  
  return (
    <div className="bg-gray-900 flex flex-col">
      <div className="w-[50%] ml-20">
        <video autoPlay srcObject={remoteStream} className="w-full h-screen" />
      </div>
    </div>
  );
};
