import React from 'react'

export const RewardCard = () => {
  return (
 
  <div className='w-72 bg-[#16141c] h-[400px] flex flex-col rounded-xl'>
    <div className='w-full h-[45%] bg-green-300 rounded-xl overflow-hidden'>
        <img src="https://ksr-ugc.imgix.net/assets/043/210/946/2b9e5e4d7ba59e47d473d211004d730d_original.png?ixlib=rb-4.1.0&q=80&blur=false&w=600&fit=true&v=1701161122&gif-q=50&s=adc1a18daee3318ac4064ef0f7d78437" alt="" style={{width:'100%',height:'100%'}} />
    </div>
    <div className='flex flex-col pl-5'>
        <span className='text-2xl text-white font-medium'>Ring One - IGG Special</span>
        <span className='text-2xl text-white font-bold pt-2'>Rs₹.299</span>
        <span className='text-lg text-white font-medium pt-2'>included items</span>
        <ul className='text-white list-disc pl-10'>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            
        </ul>
        <span className='text-lg text-white font-medium pt-2'>Estimated shipping</span>
        <span className='text-sm text-white font-medium '>april 2034</span>
        <div className='h-5'></div>
    </div>

  </div>
  
  )
}
