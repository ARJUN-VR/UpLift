import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/slices/userApiSlice";
import { setCredentials } from "../../redux/reducers/userReducers";
import { toast } from "react-toastify";


export const SignUpForm = () => {
  const [name,setName] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  const [password,setPass] = useState<string>('')
  const [confirmPass,setConfirmPass] = useState<string>('')

  const {userInfo} = useSelector((state:RootState)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register,{isLoading}] = useRegisterMutation()

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  })

  const registerHandler = async(event:React.FormEvent)=>{
    event.preventDefault()
    if(password!==confirmPass){
      return toast.error('Passwords do not match')

    }
   const userData = await register({name,email,password}).unwrap()
   dispatch(setCredentials({...userData}))
   navigate('/')
   
  }


  return (
<div className="flex flex-wrap">
  <div className="flex w-full flex-col md:w-1/2">
    <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
      <a href="#" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"> UpLift . </a>
    </div>
    <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
      <p className="text-center text-3xl font-bold">Welcome.</p>
    
      <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"><img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"  /> Signup with Google</button>
      <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
        <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
      </div>
      <form className="flex flex-col pt-3 md:pt-8" onSubmit={registerHandler}>
      <div className="flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <input type="name" value={name} id="login-email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Fullname" onChange={(event)=>setName(event.target.value)} />
          </div>
        </div>
        <div className="flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <input type="email" id="login-email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" value={email} onChange={(event)=>setEmail(event.target.value)} />
          </div>
        </div>
        <div className="mb-12 flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <input type="password" id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" value={password} onChange={(event)=>setPass(event.target.value)} />
          </div>
        </div>
        <div className="mb-12 flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <input type="password" id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="ConfirmPassword" value={confirmPass} onChange={(event)=>setConfirmPass(event.target.value)}/>
          </div>
        </div>
        
        <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">Register</button>
      </form>
      <div className="py-12 text-center">
        
      </div>
    </div>
  </div>
  <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
    <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
      <p className="mb-8 text-3xl font-semibold leading-10">We work 10x faster than our compeititors and stay consistant. While they're bogged won with techincal debt, we're realeasing new features.</p>
      <p className="mb-4 text-3xl font-semibold">John Elmond</p>
      <p className="">Founder, Emogue</p>
      <p className="mb-7 text-sm opacity-70">Web Design Agency</p>
    </div>
    <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
  </div>
</div>



  )
}
