import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {useState , useEffect} from 'react'
import { useGetSearchDataMutation } from "../../redux/slices/userApiSlice";
  interface SearchData{
    _id:string;
    title:string;
    tagline:string;

}
export const Header = ({callback}) => {
  const [searchQuery,setSearchQuery] = useState<string>('')
  const [result,setResult] = useState<SearchData[]>([])
  const [filtered,setFiletered] = useState<SearchData[]>([])
  const [suggestions,setSuggestions] = useState<string[]>([])
 
  const [getSearchData] = useGetSearchDataMutation()


  const navigate = useNavigate()




  useEffect(()=>{
    const fetchData = async()=>{
      const data = await getSearchData('').unwrap()
      setResult(data.searchData)
    }
    fetchData()
  },[])

  console.log(result)

  const handleSearch = async(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(event.target.value)
    const input = event.target.value.toLocaleLowerCase();
    const filteredData = result.filter((item)=>item.title.toLowerCase().includes(input)||item.tagline.toLowerCase().includes(input))
 
    setFiletered(filteredData)
    const sug = filteredData.map(item=>item.title)
    setSuggestions(sug)


  }


  const searchQueries = async()=>{

  }
  useEffect(()=>{
    searchQueries()

  },[searchQuery])

  callback(filtered)
 

  return (
    // <!-- component -->
    <div className="h-24 w-full flex   py-5   px-1  bg-[#0c0c0c]   text-white sticky top-0 z-10">
      
      
        
        {/* search */}
        <div className="flex  space-x-3 items-center ml-[20%] bg-[#0c0c0c]  w-1/3 mt-8">
          <input type="text" className="rounded-xl bg-gray-700 w-full h-8 pl-3"  placeholder="search campaigns" onChange={handleSearch} onBlur={()=>setSuggestions([])}/>
          {suggestions.length > 0 && (
          <ul className="absolute top-full bg-gray-900 border border-gray-300 rounded-b-xl z-10 w-[500px]">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-3 py-1 hover:bg-gray-200 hover:text-black"
                onClick={()=> navigate('/search')}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
          <FontAwesomeIcon icon={faSearch} color="white" />
          
        </div>
        
        {/* create campaign button*/}
        <div className=" bg-blue-80 ml-10 mt-5 font-serif font-semibold">
          <button className="bg-blue-500 w-64 h-10 rounded-lg " onClick={()=>{navigate('/create-campaign')}}>create campaign</button>
        </div>
      </div>
  
  );
};

