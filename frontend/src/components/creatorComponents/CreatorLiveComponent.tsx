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
  const peerConnectionRef = useRef<RTCPeerConnection>();
  const localStreamRef = useRef<MediaStream>();

  useEffect(() => {
    socket.on("newjoin", handleJoin);

    return () => {
      socket.off("newjoin", handleJoin);
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  const getLocalData = async () => {
    try {
      const stream: MediaStream | null =
        await navigator.mediaDevices.getUserMedia({ video: true });
      localStreamRef.current = stream;
      if (videoRef.current && localStreamRef.current) {
        videoRef.current.srcObject = localStreamRef.current;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  useEffect(() => {
    getLocalData();
  }, []);

  const createPeerConnection = async () => {
    try {
      peerConnectionRef.current = new RTCPeerConnection(servers);
      console.log("stream:", localStreamRef.current);
      peerConnectionRef.current.onicegatheringstatechange = async () => {
        console.log("ice state", peerConnectionRef.current?.iceGatheringState);
      };

      console.log("works");
      if (localStreamRef.current) {
        const tracks = localStreamRef.current.getTracks();
        tracks.forEach((track) => {
          peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
        });
        console.log("inside");
      }

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice", event.candidate);
        }
      };
    } catch (error) {
      console.log("error", error);
    }
  };

  const createOffer = async () => {
    console.log("a");
    await createPeerConnection();
    console.log("b");

    console.log('state:',peerConnectionRef.current?.signalingState)
    const offer = await peerConnectionRef.current?.createOffer();
    if (offer) {
  console.log('state:',peerConnectionRef.current?.signalingState)

      await peerConnectionRef.current?.setLocalDescription(offer);
      socket.emit("offer", offer);
    }
  };

  const handleJoin = async () => {
    console.log("new user joined");
    await createOffer();
  };
  console.log(videoRef, "videoRef");

  useEffect(() => {
    socket.on("answersent", (answer) => {
      console.log('gettign...')
      addAnswer(answer);
    });
    socket.off("answersent", addAnswer);
  }, []);
  const addAnswer = async (answer: RTCSessionDescriptionInit) => {
    try{
      console.log("answer:", answer);
      console.log('peerconnection:', peerConnectionRef.current);
  console.log('state:',peerConnectionRef.current?.signalingState)

      if(!peerConnectionRef.current?.currentRemoteDescription){
        try{
          console.log(peerConnectionRef.current?.connectionState)
          if(peerConnectionRef.current?.signalingState === 'have-remote-offer' || peerConnectionRef.current?.connectionState === 'connecting'){

            console.log('getitjkgsdf')
            peerConnectionRef.current?.setRemoteDescription(answer)
          }

          
        }catch(error){
          console.log(error)
        }

      }
    }catch(error){
      console.log(error)
    }

  };

  peerConnectionRef.current?.addEventListener('connectionstatechange',event =>{
    if(peerConnectionRef.current?.connectionState === 'connected'){
      console.log('peers connected')
    }else{
      console.log(peerConnectionRef.current?.connectionState,'connection state')
    }
  })

  return (
    <div className="bg-gray-900 flex flex-col">
      <button>hellrogffcfvghtgfgfrfffhhfrdfffrffd</button>
      {localStreamRef.current && (
        <div className="w-[50%] ml-20">
          <video ref={videoRef} autoPlay className="w-full h-screen" />
        </div>
      )}
    </div>
  );
};
