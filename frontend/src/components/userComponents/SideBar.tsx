
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

import { faHouseChimneyCrack } from '@fortawesome/free-solid-svg-icons';
import { useLogoutMutation } from '../../redux/slices/userApiSlice';
import { logout } from '../../redux/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
export const SideBar = () => {

  const {userInfo} = useSelector((state:RootState)=>state.auth)

  const [logoutCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler =async()=>{
    try {
      console.log('button works')
      await logoutCall('hi').unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <div className='ml-4 bg-gray-800 w-1/6 mb-10 '>
          {/* <!-- Sidebar --> */}
  <aside className="h-[570px] w-16 flex flex-col space-y-7 pb-44  bg-gray-700   mt-20  items-center justify-center relative  text-white rounded-2xl">
    

    {/* <!-- Home --> */}
    <div className="h-10 w-10 flex items-center justify-center  rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
      

<FontAwesomeIcon icon={faHouseChimneyCrack} />
    </div>

    {/* <!-- Theme --> */}
    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    </div>

    {/* <!-- Profile --> */}
    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
    </div>

    {/* <!-- signout--> */}
    {userInfo ? (
       <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" onClick={logoutHandler}>
       <FontAwesomeIcon icon={faSignOutAlt}  />
   
       </div>
    ):(
      <>
      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" >
      <FontAwesomeIcon icon={faSignIn} /> 
      </div>
      </>
    )}
   
  </aside>
    </div>
  )
}
