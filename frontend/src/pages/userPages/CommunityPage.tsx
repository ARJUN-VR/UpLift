import React, { useState } from 'react'
import { Channels } from '../../components/userComponents/Channels'
import { Header } from '../../components/userComponents/Header'
import { ChatArea } from '../../components/userComponents/ChatArea'

export const CommunityPage = () => {

    const userData = localStorage.getItem('userInfo')
    const parsedData = JSON.parse(userData)

    

    

    
    

    const [id,setId] = useState<string>('')

    

    const channelProp = (value:string)=>{
        setId(value)

    }
  return (
    <>
    {
        userData?(
            <div className="bg-[#0c0c0c] min-h-screen ">
  
    <div className="flex w-full space-x-2 ">
     
      <Channels callback={channelProp}/>
      <ChatArea campaignId={id}/>
   
    </div>
 </div>
        ):(
            <div className="bg-[#0c0c0c] min-h-screen">
         
            <div className="flex w-full space-x-2">
             
             <span className='text-white text-3xl'>Sign in to contribute</span>
           
            </div>
         </div>
        )
    }
    </>

    
  )
}
