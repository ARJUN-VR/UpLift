import React from 'react'

export const CampiagnMenu = () => {
  return (
    <>
     <div className="w-full bg-gray-800 flex flex-col items-center font-bold text-white ">
        <span className="text-3xl">MakaGiC VS01 Intelligent Electric Vise for DIYer & Maker</span>
        <span className="text-xl font-normal pt-2">Smart clamping | Adjustable intensity | Multiple modes | Expandable peripherals | Large capacity battery | All aluminum alloy body</span>
      </div>
      <div className="w-full bg-blue-200 flex mt-4">
        <div className="w-2/3">
          <video
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            controls
            autoPlay
          >
            <source
              src="https://res.cloudinary.com/dpuzhf0j2/video/upload/v1705373798/o5bemee6mncihn5wz2jv.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* details area */}
        <div className="w-1/3 flex  bg-gray-800 flex-col  pl-10">
            {/* funding bar */}
          <div className="bg-gray-300 w-[90%] h-2">
            <div className="bg-green-500 w-[45%] h-full"></div>
          </div>
          {/* goal */}
          <span className="text-2xl font-bold text-green-500 pt-2">₹RS.19,00,00</span>
          <span className="text-medium font-semibold text-white ">pledged of ₹RS.45,00,000</span>
          {/* backers */}
          <span className="text-2xl font-bold text-white  pt-5">456</span>
          <span className="text-large font-bold text-white">Backers</span>
          {/* days to go */}
          <span className="text-2xl font-bold text-white  pt-5">60</span>
          <span className="text-large font-bold text-white">days to go</span>
          {/* notice */}
          <span className="text-sm font-bold text-gray-200 pt-10">All or nothing. This project will only be funded if it reaches its goal by Tue, February 20 2024 3:30 AM UTC +05:30.</span>
          

          {/* pledge */}
          <button className="w-[90%] bg-green-400  h-12 mt-auto text-white">Back this project</button>



         


        </div>
      </div>
    </>
   
  )
}
