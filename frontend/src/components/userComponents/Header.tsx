import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Header = ({handleSearchQuery}) => {
  const navigate = useNavigate()

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const query = event.target.value
    handleSearchQuery(query)
    
  }
  return (
    // <!-- component -->
    <div className="h-24 w-full flex   py-5   px-1  bg-[#0c0c0c]   text-white sticky top-0 z-10">
      
      
        
        {/* search */}
        <div className="flex  space-x-3 items-center ml-[20%] bg-[#0c0c0c]  w-1/3 mt-8">
          <input type="text" className="rounded-xl bg-gray-700 w-full h-8 pl-3"  placeholder="search campaigns" onChange={handleChange}/>
          <FontAwesomeIcon icon={faSearch} color="white" />
        </div>
        {/* create campaign button*/}
        <div className=" bg-blue-80 ml-10 mt-5 font-serif font-semibold">
          <button className="bg-blue-500 w-64 h-10 rounded-lg " onClick={()=>{navigate('/create-campaign')}}>create campaign</button>
        </div>
      </div>
  
  );
};

