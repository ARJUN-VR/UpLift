import { useState } from "react"
import { logout } from "../../redux/reducers/adminReducers"
import { useDispatch } from "react-redux"
import { useAdminlogoutMutation } from "../../redux/slices/adminApiSlice"
import { useNavigate } from "react-router-dom"


const SideBar = () => {
    const [tab,setTab] = useState<string>('dashboard')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [adminLogout] = useAdminlogoutMutation()


    const logoutHandler = async()=>{
       await adminLogout('hi').unwrap()
       dispatch(logout())
       navigate('/admin')
    }
  return (
    <div className="h-screen flex flex-row bg-gray-100 shadow-2xl">
  <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
    <div className="flex items-center justify-center h-20 shadow-md">
      <h1 className="text-3xl uppercase font-serif text-gray-800">UpLift</h1>
    </div>
    <ul className="flex flex-col py-4">
      <li className={`${tab=='dashboard' ? 'bg-gray-100':''}`}>
        <a href="#" className={`${tab=='dashboard' ? 'translate-x-4 text-gray-800 ':''}flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`} onClick={()=>setTab('dashboard')}>
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400" ><i className="bx bx-home" ></i></span>
          <span className="text-sm font-medium" onClick={()=>navigate('/admin/home')}>Dashboard</span>
        </a>
      </li>
      <li className={`${tab=='users' ? 'bg-gray-100':''}`}>
        <a href="#" className={`${tab=='users' ? 'translate-x-4 text-gray-800 ':''}flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`} onClick={()=>setTab('users')}>
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
          <span className="text-sm font-medium" onClick={()=>navigate('/admin/users')}>Users</span>
        </a>
      </li>
      <li className={`${tab=='creators' ? 'bg-gray-100':''}`}>
        <a href="#" className={`${tab=='creators' ? 'translate-x-4 text-gray-800 ':''}flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`} onClick={()=>setTab('creators')}>
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-drink"></i></span>
          <span className="text-sm font-medium">Creators</span>
        </a>
      </li>
      <li className={`${tab=='campaigns' ? 'bg-gray-100':''}`}>
        <a href="#" className={`${tab=='campaigns' ? 'translate-x-4 text-gray-800 ':''}flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`} onClick={()=>setTab('campaigns')}>
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span> 
          <span className="text-sm font-medium ">Campaigns</span>
        </a>
      </li>
  
 
      <li className={`${tab=='not' ? 'bg-gray-100':''}`}>
        <a href="#" className={`${tab=='not' ? 'translate-x-4 text-gray-800 ':''}flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`} onClick={()=>setTab('not')}>
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-bell"></i></span>
          <span className="text-sm font-medium">Notifications</span>
          <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
        </a>
      </li>
      <li>
        <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
          <span className="text-sm font-medium" onClick={logoutHandler}>Logout</span>
        </a>
      </li>
    </ul>
  </div>
</div>
  )
}

export default SideBar