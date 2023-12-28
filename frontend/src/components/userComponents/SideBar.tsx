
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,  faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

import { faHouseChimneyCrack } from '@fortawesome/free-solid-svg-icons';
import { useLogoutMutation } from '../../redux/slices/userApiSlice';
import { logout } from '../../redux/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
export const SideBar = () => {
  const [state,setState] = useState<string>('home')
  const {userInfo} = useSelector((state:RootState)=>state.auth)

  const [logoutCall] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler =async()=>{
    try {
      await logoutCall('').unwrap()
      dispatch(logout())
      toast.success('logout successful.')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <div className='ml-10 bg-gray-800 w-1/6  pt-[15px]'>
          {/* <!-- Sidebar --> */}
  <aside className="h-[510px] w-16 flex flex-col space-y-7 pb-44  bg-gray-700   mt-20  items-center justify-center relative  text-white rounded-2xl shadow-2xl ">
    

    {/* <!-- Home --> */}
    <div className={`${state==='home'?'bg-white text-gray-800 ':''}h-10 w-10 flex items-center justify-center  rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white`} onClick={()=>{navigate('/') ; setState('home')} }>
      

<FontAwesomeIcon icon={faHouseChimneyCrack} />
    </div>

    {/* <!-- Rooms --> */}
    <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
    <FontAwesomeIcon icon={faUsersRectangle} />
    </div>

    {/* <!-- Profile --> */}
    <div className={`${state=='profile'?'bg-white text-gray-800 ':''}h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white`} onClick={()=>{navigate('/profile');
    setState('profile')}} title='profile'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
    </div>

    {/* <!-- signout--> */}
    {userInfo ? (
       <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" onClick={logoutHandler} title='sign out'>
       <FontAwesomeIcon icon={faSignOutAlt} title='sign out' />
   
       </div>
    ):(
      <>
      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white" onClick={()=>navigate('/login')} title='sign in'>
      <FontAwesomeIcon icon={faSignIn} title='sign in'/> 
      </div>
      </>
    )}
   
  </aside>
    </div>
  )
}
