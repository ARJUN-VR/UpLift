import React, { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/slices/userApiSlice"
import { setCredentials } from "../../redux/reducers/userReducers"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../redux/store"
import { toast } from "react-toastify"



export const SignInForm = () => {
  const [email,setEmail] = useState<string>('')
  const [pass,setPass] = useState<string>('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login,{isLoading}] = useLoginMutation()

  const {userInfo} = useSelector((state:RootState)=>state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[navigate,userInfo])

  const submitHandler=async(event:React.FormEvent)=>{
       event.preventDefault()
       try{
        const res = await login({email,pass}).unwrap()
        console.log(res)
        dispatch(setCredentials({...res}))
        toast.success('signed in successfully.')

       }catch(err){
        console.log(err)
        toast.error(err?.data?.message || err.error)
       }
  }
  return (
    <div className="mt-40">
      <form onSubmit={submitHandler}>
    <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
      <div className="mx-auto mb-2 space-y-3">
        <h1 className="text-3xl font-bold text-gray-700">Log into UpLift</h1>
        <p className="text-gray-500">Login to access your account</p>
      </div>
      
      <div>
      
        <div className="relative mt-2 w-full">
          <input
            type="text"
            name="email"
            value={email}
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            onChange={(event)=>setEmail(event.target.value)}
          />
          <label
            htmlFor="email"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
          >
         
            Enter Your Email{" "}
          </label>
        </div>
      </div>
  
      <div>
        <div className="relative mt-2 w-full">
          <input
            type="password"
            name="password"
            value={pass}
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            onChange={(event)=>setPass(event.target.value)}
          />
          <label
            htmlFor="password"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
          >
          
            Enter Your Password
          </label>
         <span className="ml-1 text-blue-600"><a href="/email-verification"> Forgot password?</a></span> 
        </div>
    
      </div>
  
      <button type="submit" className="rounded-lg bg-blue-600 py-3 mt-4 font-bold text-white ">Login</button>
      <div>don't have an account? <span className="text-blue-800"><a  href="/register">register account</a></span></div>
     
     
    </div>
     
    
    </form>
  </div>



  
  )
}
