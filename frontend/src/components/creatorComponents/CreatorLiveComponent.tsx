
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'

interface LIVEPROP{
    isLive:boolean
}

const socket = io('http://localhost:8000')


export const CreatorLiveComponent = ({isLive}:LIVEPROP) => {
    const [localStream,setLocalStream] = useState<MediaStream|undefined|null>()

  

    const videoRef = useRef(null)

    const getLocalData = async()=>{
        try {
            const stream: MediaStream | null = await navigator.mediaDevices.getUserMedia({ video: true });
            setLocalStream(stream);
            if (videoRef.current && stream) {
                videoRef.current.srcObject = stream;     
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    }

   if(isLive){
    useEffect(()=>{
        getLocalData()

    },[])
   }
   console.log(localStream)

   const handleJoined = ()=>{
    console.log('new user joined')
   }

  return (
    <div className='bg-gray-900 flex flex-col'>

        {
            localStream &&(
                <div className='w-[50%] ml-20'>
                <video ref={videoRef} autoPlay className="w-full h-screen" />

                </div>

            )
        }
    </div>
  )
}
