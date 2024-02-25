import { useNavigate } from "react-router-dom"


export const ExploreCard = () => {

  const navigate = useNavigate()
  return (
 <div className="flex flex-col ml-3 w-[20%] mr-5 h-full bg-[#0c0c0c]">
 <div
        className="p-8  flex items-center rounded-lg px-4 duration-300 cursor-pointer hover:bg-white text-gray hover:text-gray bg-[#76c9e6] shadow-lg" onClick={()=>navigate('/category/:Technology')}
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Technology</span>
      </div>
      <div
        className="p-8 mt-4  flex items-center rounded-lg px-4 duration-300 cursor-pointer hover:bg-white text-gray hover:text-gray bg-[#4a6241] shadow-lg" onClick={()=>navigate('/category/:Art')}
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Art</span>
      </div>
      <div
        className="p-8  mt-4 flex items-center rounded-lg px-4 duration-300 cursor-pointer hover:bg-white text-gray hover:text-gray bg-[#AAD9BB] shadow-lg" onClick={()=>navigate('/category/:Games')}
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Games</span>
      </div>
      <div
        className="p-8  mt-4 flex items-center rounded-lg px-4 duration-300 cursor-pointer hover:bg-white text-gray hover:text-gray bg-[#AAD7D9] shadow-lg" onClick={()=>navigate('/category/:Popular')}
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Popular</span>
      </div>
      <div
        className="p-8  mt-4 flex items-center rounded-lg px-4 duration-300 cursor-pointer hover:bg-white text-gray hover:text-gray bg-[#e9cec5] shadow-lg" onClick={()=>navigate('/category/:New')}
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">New Releases</span>
      </div>
 </div>
 


  
  )
}
