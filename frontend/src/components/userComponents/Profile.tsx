import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../redux/store"
import { useGetProfileMutation, useLogoutMutation } from "../../redux/slices/userApiSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { logout } from '../../redux/reducers/userReducers';


export const Profile = () => {
  const [name,setName] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [date,setDate] = useState('')

  const [getProfile] = useGetProfileMutation() 
  const [logoutCall] = useLogoutMutation()


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state:RootState) => state.auth);
// console.log(userInfo);

// let name = '';
// let email = '';
// let date = '';

// if (userInfo?.result?.user) {
//   name = userInfo.result.user.name || ''; 
//   email = userInfo.result.user.email || ''; 
//   const createdAt = userInfo.result.user.createdAt || '';
//   date = new Date(createdAt).toDateString();
// } else if (userInfo?.userData) {
//   name = userInfo.userData.name || ''; 
//   email = userInfo.userData.email || ''; 
//   const createdAt = userInfo.userData.createdAt || '';
//   date = new Date(createdAt).toDateString();
// }

useEffect(()=>{
  if(!userInfo){
    navigate('/login')
  }
 const getData = async()=>{
  try{
    const userData = await getProfile('')
    console.log(userData)
   
    // const data = userData.data.userdata
   
    if(userData.error?.data?.message == 'Access denied.'){
      await logoutCall('').unwrap()
      dispatch(logout())
      navigate('/login')
      toast.error('Access denied.')
    }else{
      console.log(name,'name')
      setName(userData.data.userdata.name)
      setEmail(userData.data.userdata.email)
      const date = userData.data.userdata.createdAt
      const modifiedDate = new Date(date).toDateString()
 
      setDate(modifiedDate)
    }
  }catch(err){
    console.log(err)
    toast.error(err?.data?.message || err.error)
  }

 }
 getData()
},[])
 


  return (
<div className="bg-gray-700 h-full p-1 rounded-2xl flex"><div className="m-10 w-[45vh]">
  <div className="rounded-lg border bg-[#526D82] px-4 pt-8 pb-10 shadow-lg mt-[60px]">
    <div className="relative mx-auto w-36 rounded-full">
      <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
      <img className="mx-auto h-auto w-full rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="profile pic" />
    </div>
    <span ><FontAwesomeIcon icon={faPenToSquare} /></span>
    <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{name}</h1>

    
    <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">

    <li className="flex items-center py-3 text-sm">
        <span>Email</span>
        <span className="ml-auto">{email}</span>
      </li>
     
      <li className="flex items-center py-3 text-sm">
        <span>Joined On</span>
        <span className="ml-auto">{date}</span>
      </li>
    </ul>
  </div>
</div>
<div className="w-[700px] h-[500px] bg-violet-200 flex gap-x-3 mt-8 ml-10 rounded-2xl" >
<div className="bg-gray-800 w-full rounded-2xl flex gap-x-48 pt-4">
  <Link to={''} className="pl-44 text-white font-bold">Intersted</Link>
  <Link to={''} className="text-white font-bold">Backed</Link>

</div>


</div>

</div>


  )
}
