
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

    <div
      className="sidebar pl-2 pr-2 fixed top-24 bottom-0 lg:left-0  w-64 overflow-y-auto text-center bg-[#0c0c0c]"
    >
   
      <div
        className="p-6   flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black bg-[#141514] shadow-lg"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Home</span>
      </div>
      <div
        className="p-6 mt-5  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black bg-[#141514]"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Explore</span>
      </div>
      <div
        className="p-6 mt-5  flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-white hover:text-black bg-[#141514]"
      >
        <i className="bi bi-house-door-fill "></i>
        <span className="text-[15px] ml-4  font-bold ">Community</span>
      </div>
      <div
        className="p-6  mt-5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black bg-[#141514]"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Settings</span>
      </div>
      <div
        className="p-6  mt-5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black bg-[#141514]"
      >
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Profile</span>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      
      <div
        className="p-6 mt-8  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black"
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4  font-bold">Logout</span>
      </div>
    </div>

   

  )
}
