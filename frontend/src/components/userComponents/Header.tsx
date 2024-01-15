import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate()
  return (
    // <!-- component -->
    <div className="h-16 w-full flex items-center   px-1  bg-gray-800 text-white ">
      <div className="bg-gray-800 flex  w-full space-x-10">
        {/* search */}
        <div className="flex  space-x-3 items-center ml-[27%] bg-gray-800 mt-1 w-1/3">
          <input type="text" className="rounded-xl bg-gray-700 w-full h-8 " />
          <FontAwesomeIcon icon={faSearch} color="white" />
        </div>
        {/* create campaign button*/}
        <div className=" bg-blue-80 ml-64">
          <button className="bg-blue-500 w-36 h-10 rounded-lg " onClick={()=>{navigate('/create-campaign')}}>create campaign</button>
        </div>
      </div>
    </div>
  );
};

