

export const ExploreCard = () => {
  return (
<div className="bg-gray-800 h-10 w-[800px] ml-28 flex justify-between space-x-2">
  <button className="bg-white rounded-2xl w-[25%] flex justify-center items-center text-black font-bold  ">All</button>
  <button className="bg-gray-500 rounded-2xl w-[25%] flex justify-center items-center text-white font-bold ">Trending</button>
  <button className="bg-gray-500 rounded-2xl w-[25%] flex justify-center items-center text-white font-bold ">Popular</button>
  <button className="bg-gray-500 rounded-2xl w-[25%] flex justify-center items-center text-white font-bold ">New release</button>

</div>
  
  )
}
