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
let peerConnection:RTCPeerConnection;

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
    peerConnection = new RTCPeerConnection(servers)
    console.log('state:',peerConnection?.signalingState)
    await peerConnection.setRemoteDescription(offer)
    console.log('state:',peerConnection?.signalingState)

    await createAnswer()

  } catch (error) {
    console.log(error)
  }

}



const createAnswer =async()=>{
  try{
    console.log('in')
    const answer = await peerConnection.createAnswer()
    console.log('in2')
  console.log('state:',peerConnection?.signalingState)
    await peerConnection.setLocalDescription(answer)
  console.log('state:',peerConnection.signalingState)

    console.log('in3')
  
    socket.emit('answer',answer)
  
    peerConnection.ontrack = (event) => {
      console.log('getting in...')
      setRemoteStream(event.streams[0]);
    };
  }catch(error){
    console.log(error)
  }
 
  
}




useEffect(()=>{
  socket.on('icesent',(candidate:RTCIceCandidate)=>{
    console.log('ice candidate:',candidate)

    const connect =()=>{
      try{
        if(peerConnection){
          peerConnection.addIceCandidate(candidate)
          console.log('candidate:',candidate)
        }
      }catch(error){
        console.log(error)
      }

    }
    connect()
  })
  socket.off('icesent',connect)
},[])

  
  return (
    <div className="bg-gray-900 flex flex-col">
      <div className="w-[50%] ml-20">
        <video autoPlay className="w-full h-screen" />
      </div>
    </div>
  );
};
