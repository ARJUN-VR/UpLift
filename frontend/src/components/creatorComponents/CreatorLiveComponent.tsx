import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react'

export const CreatorLiveComponent = ({isLIve}) => {
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

   if(isLIve){
    useEffect(()=>{
        getLocalData()

    },[])
   }
   console.log(localStream)

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
