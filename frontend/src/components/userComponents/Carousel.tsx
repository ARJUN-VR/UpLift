import React from 'react'

export const Carousel = () => {
  return (
    <div className='bg-[#0c0c0c] rounded-xl h-full overflow-hidden w-full  relative'>
    <img className='object-cover h-full w-full' 
         src="https://c0.wallpaperflare.com/preview/165/219/726/camera-card-communication-composition.jpg" 
         alt="" 
 
         />
    <div className="absolute left-0 top-0 h-full w-full flex pt-80 justify-start pl-10 text-white bg-gradient-to-b from-transparent via-transparent to-gray-900">
        <div>
            <h1 className="text-3xl font-bold mb-2">Prince of persia</h1>
            <p className="text-lg max-w-md">A catchy and informative description goes here. Use this space to communicate your message or call to action.</p>
            <button className='bg-white text-black font-semibold w-44 h-11 mt-3'>View campaign</button>
        </div>
    </div>
</div>

  )
}
