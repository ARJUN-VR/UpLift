import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { io } from "socket.io-client";

export const LiveStreamComponent = () => {
  const [remoteStream,setRemoteStream] = useState<MediaStream|null>(null)
  const peerConnectionRef = useRef<RTCPeerConnection>()

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
    peerConnectionRef.current = new RTCPeerConnection(servers)
    console.log('state:',peerConnectionRef.current?.signalingState)
    console.log('connectin state:',peerConnectionRef.current.connectionState)
    await peerConnectionRef.current.setRemoteDescription(offer)
    console.log('state:',peerConnectionRef.current?.signalingState)
    console.log('connectin state:',peerConnectionRef.current.connectionState)


    await createAnswer()

  } catch (error) {
    console.log(error)
  }

}



const createAnswer =async()=>{
  try{

    const answer = await peerConnectionRef.current?.createAnswer()
  console.log('state:',peerConnectionRef.current?.signalingState)

  console.log(peerConnectionRef.current,'poedfjlsa')

    await peerConnectionRef.current?.setLocalDescription(answer)
  console.log('state:',peerConnectionRef.current?.signalingState)
  console.log('connectin state:',peerConnectionRef.current?.connectionState)

  if(peerConnectionRef.current){
    console.log('enehf')
    peerConnectionRef.current.ontrack = (event)=>{
      console.log('new track added;',event.track)
    }
  }

  console.log(peerConnectionRef.current,'just checking')


  
    socket.emit('answer',answer)


    if(peerConnectionRef.current){
      console.log('getting in.....')
      peerConnectionRef.current.ontrack = (event) => {
        console.log('ontrack event triggered');
        if (event.streams && event.streams.length > 0) {
          console.log('Remote stream received:', event.streams[0]);
          setRemoteStream(event.streams[0]);
        }
      };
    }

    console.log(remoteStream,'remotestream')
  }catch(error){
    console.log(error)
  }
 
  
}








useEffect(()=>{
  socket.on('icesent',(candidate:RTCIceCandidate)=>{
    console.log('ice candidate:',candidate)

    const connect =()=>{
      try{
        if(peerConnectionRef.current){
          peerConnectionRef.current.addIceCandidate(candidate)
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
