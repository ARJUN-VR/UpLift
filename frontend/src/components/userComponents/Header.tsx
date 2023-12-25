
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
  return (
    // <!-- component -->
<div className="h-20 w-full bg-gray-800 relative flex overflow-hidden">


  
 
  <div className="w-full h-full flex flex-row  ">
    {/* <!-- Header --> */}
    <header className="h-16 w-full flex items-center relative  px-1 space-x-10 bg-gray-800 text-white ">
      {/* search */}
      <div className="flex  space-x-3 items-center ml-24 bg-gray-900">
    <input type="text" className='rounded-xl bg-gray-500'/>
    <FontAwesomeIcon icon={faSearch} color='white'/>
      </div>
      {/* create campaign */}
      <div className='w-36 h-3/4 bg-gray-800 ml-[400px]'>
        <button className='bg-blue-400 w-full h-full rounded-2xl '>
          Create campaign
        </button>
      </div>
     
    </header>

   
  </div>

</div>
  )
}
