import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
};

export const CreatorLiveComponent = () => {
    const [localStream, setLocalStream] = useState<MediaStream | undefined | null>();
    const peerConnectionRef = useRef<RTCPeerConnection>();

    useEffect(() => {
        socket.on("newjoin", handleJoin);

        return () => {
            socket.off("newjoin", handleJoin);
        };
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);

    const getLocalData = async () => {
        try {
            const stream: MediaStream | null = await navigator.mediaDevices.getUserMedia({ video: true });
            setLocalStream(stream);
            if (videoRef.current && stream) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    useEffect(() => {
        getLocalData();
    }, []);

    const createPeerConnection = async () => {
        peerConnectionRef.current = new RTCPeerConnection(servers);
        console.log('works')
        localStream?.getTracks().forEach((track) => {
            peerConnectionRef.current?.addTrack(track, localStream);
        });
        peerConnectionRef.current.onicecandidate = (event) => {
          console.log('2')
            if (event.candidate) {
              console.log('3')
                socket.emit('ice', event.candidate);
            }
        };
    };

    const createOffer = async () => {
        await createPeerConnection();
        const offer = await peerConnectionRef.current?.createOffer();
        if (offer) {
            await peerConnectionRef.current?.setLocalDescription(offer);
            socket.emit('offer', offer);
        }
    };

    const handleJoin = async () => {
        console.log("new user joined");
        await createOffer();
    };

    useEffect(() => {
        socket.on('answersent', (answer) => {
            addAnswer(answer);
        });
        socket.off('answersent', addAnswer);
    }, []);

    const addAnswer = async (answer: RTCSessionDescriptionInit) => {
        console.log('answer:', answer);
        // console.log('peerconnection:', peerConnectionRef.current);
        // if(!peerConnectionRef.current?.currentRemoteDescription){
        //   peerConnectionRef.current?.setRemoteDescription(answer)
        // }
    };

    return (
        <div className="bg-gray-900 flex flex-col">
            {localStream && (
                <div className="w-[50%] ml-20">
                    <video ref={videoRef} autoPlay className="w-full h-screen" />
                </div>
            )}
            <button onClick={createPeerConnection} className="bg-red-800 w-40 h-40" >create peerconnection </button>
        </div>
    );
};
