import { useEffect, useState } from "react";
import { connect } from "react-redux";
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
let peerConnection:RTCPeerConnection;

const handleOffer =async(offer:RTCSessionDescriptionInit)=>{
  try {
    console.log('offer:',offer)
     peerConnection = new RTCPeerConnection(servers)
    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    socket.emit('answer',answer)
    

    peerConnection.ontrack= (event)=>{
      setRemoteStream(event.streams[0])
    }


  } catch (error) {
    console.log(error)
  }

}
useEffect(()=>{
  socket.on('icesent',(candidate:RTCIceCandidate)=>{
    console.log('ice candidate:',candidate)

    const connect =()=>{
      if(peerConnection){
        peerConnection.addIceCandidate(candidate)
        console.log('candidate:',candidate)
      }
    }
    connect()
  })
  socket.off('icesent',connect)
},[])
  
  return (
    <div className="bg-gray-900 flex flex-col">
      <div className="w-[50%] ml-20">
        <video autoPlay srcObject={remoteStream} className="w-full h-screen" />
      </div>
    </div>
  );
};
