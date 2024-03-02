import React, { useEffect, useState } from 'react'
import { useGetChannelDataMutation } from '../../redux/slices/userApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


interface channelData{
  _id:string,
  title:string,
  image:string
}

export const Channels = ({callback}) => {


  const [channel,setChannel] = useState<channelData[]>([])

  const [isChannels,setIsChannels] = useState<boolean>(true)


 const {userInfo} = useSelector((state:RootState)=>state.auth)


 const email = userInfo.result.user.email

 


 

 const [fetchChannel] = useGetChannelDataMutation()
 

 useEffect(()=>{
  const getDetails = async()=>{

    const res = await fetchChannel(email).unwrap()
    if(res.data.length ===0 ){
      setIsChannels(false)
    }else{
      setChannel(res.data)

    }


  }
  getDetails()
 },[fetchChannel,email])




 

 
  return (
    <div className='text-white  w-[30%] ml-10 mt-10'>
      <div className='mb-5'>
      <span className='text-2xl font-semibold'>CHANNELS</span> 

      </div>
      {isChannels?(
        <>
        {
  channel.flat().map((data, index) => (
    <div key={index} className='flex items-center w-full bg-gray-700 rounded-md p-2 mb-1' onClick={()=>callback(data._id)}>
      <img src={data.image} alt={data.title} className='rounded-full mr-2' style={{ width: '70px', height: '70px' }} />
      <span className='line-clamp-1'>{data.title}</span>
    </div>
  ))
}
        </>
 
      ):(
        <div className="flex justify-center mt-56">
        <span className="text-white text-3xl font-bold">Back projects to access community.</span>
      </div>
      )}
     

     
    </div>
  )
}
