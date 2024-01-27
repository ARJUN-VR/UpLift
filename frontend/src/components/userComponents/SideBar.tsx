

import { useLogoutMutation } from '../../redux/slices/userApiSlice';
import { logout } from '../../redux/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const SideBar = () => {
  const {userInfo} = useSelector((state:RootState)=>state.auth)
console.log(userInfo)
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
      className=" pl-2 pr-2 sticky top-24 bottom-0 lg:left-0  w-64  text-center bg-[#0c0c0c]"
    >
   
      <div
        className="p-6   flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black bg-[#141514] shadow-lg" onClick={()=>navigate('/')}
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
        className="p-6  mt-5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black bg-[#141514]" onClick={()=>navigate('/profile')}
      >
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4  font-bold">Profile</span>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      
   {userInfo ? (
     <div
     className="p-6 mt-8  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black" onClick={logoutHandler}
   >
     <i className="bi bi-box-arrow-in-right"></i>
     <span className="text-[15px] ml-4  font-bold">Logout</span>
   </div>
   ):(
    <div
    className="p-6 mt-8  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-white text-white hover:text-black" onClick={()=>navigate('login')}
    >
    <i className="bi bi-box-arrow-in-right"></i>
    <span className="text-[15px] ml-4  font-bold">Login</span>
    </div>
   )}
    </div>

   

  )
}
