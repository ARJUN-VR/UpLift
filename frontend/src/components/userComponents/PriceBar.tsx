

export const PriceBar = () => {
  return (
    <div className="bg-gray-700 flex w-[800px] h-[90px] ml-28 rounded-2xl justify-between shadow-2xl ">
        <div className="flex justify-center items-center bg-gray-700 pl-6 rounded-2xl">
            <div className="flex flex-col text-white font-bold pl-10"><h2>pledges:</h2><h1>29,030,207</h1></div>
        </div>
        
        <div className="flex justify-center items-center bg-gray-700 pl-6">
            <div className="flex flex-col text-white font-bold"><h2>towards creative works:</h2><h1>₹450,123,16</h1></div>
      
        </div>
        <div className="flex justify-center items-center bg-gray-700 pl-6 rounded-2xl">
            <div className="flex flex-col text-white font-bold pr-10"><h2>projects funded:</h2><h1>23,165,98</h1></div>
      
        </div>


    </div>
  )
}
