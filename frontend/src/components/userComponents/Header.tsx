
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
  return (
    // <!-- component -->
    <div className="h-16 w-full flex items-center relative  px-1  bg-gray-800 text-white ">
      {/* search */}
      <div className="flex  space-x-3 items-center ml-[364px] bg-gray-800 mt-1 ">
    <input type="text" className='rounded-xl bg-gray-500 h-[30px] w-[350px]'/>
    <FontAwesomeIcon icon={faSearch} color='white'/>
      </div>
      {/* create campaign button*/}
      <div className='w-36 h-3/4 bg-gray-800 ml-[599px] mt-1'>
        <button className='bg-teal-500 w-full h-full rounded-2xl  '>
          Create campaign
        </button>
      </div>
     
    </div>




  )
}
