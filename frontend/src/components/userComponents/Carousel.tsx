import React from 'react'

export const Carousel = () => {
  return (
    <div className='bg-red-400 rounded-xl h-full overflow-hidden w-[105%] ml-3 relative '>
    <img className='object-cover h-full w-full' 
         src="https://cdn1.epicgames.com/offer/22600f09e936468c8ecfc22b5eac7d7c/EGST_StoreLandscape_2560x1440_2560x1440-d49d4862a0e1a243638d5f95517ed205" 
         alt="" 
         style={{height:'auto',width:'100%'}} />

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
