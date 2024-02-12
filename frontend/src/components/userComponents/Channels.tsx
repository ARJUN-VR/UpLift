import React, { useEffect, useState } from 'react'
import { useGetChannelDataMutation } from '../../redux/slices/userApiSlice'


interface channelData{
  _id:string,
  title:string,
  image:string
}

export const Channels = ({callback}) => {


  const [channel,setChannel] = useState<channelData[]>([])



 const userInfo = localStorage.getItem('userInfo')
 const parsedData = JSON.parse(userInfo)


 const email = parsedData.result.user.email


 

 const [fetchChannel] = useGetChannelDataMutation()
 

 useEffect(()=>{
  const getDetails = async()=>{

    const res = await fetchChannel(email).unwrap()
    setChannel(res.data)


  }
  getDetails()
 },[fetchChannel,email])




 

 
  return (
    <div className='text-white  w-[30%] ml-10 '>
      <div className='mb-5'>
      <span className='text-2xl font-semibold'>channels</span> 

      </div>
      {
  channel.flat().map((data, index) => (
    <div key={index} className='flex items-center w-full bg-gray-700 rounded-md p-2 mb-1' onClick={()=>callback(data._id)}>
      <img src={data.image} alt={data.title} className='rounded-full mr-2' style={{ width: '70px', height: '70px' }} />
      <span className='line-clamp-1'>{data.title}</span>
    </div>
  ))
}

     
    </div>
  )
}
