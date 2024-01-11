import { useState } from "react"
import { useSendOTPMutation } from "../../redux/slices/userApiSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export const EmailVerification = () => {
    const [email,setEmail] = useState<string>('')

    const [sendOTP] = useSendOTPMutation()
    const navigate = useNavigate()
    console.log(email)

    const submitHandler=async(event:React.FormEvent)=>{
      event.preventDefault()
      try{
         await sendOTP({email}).unwrap()
        localStorage.setItem('email',email)
        toast.success('OTP sent')
        navigate('/otp')
      }catch(err){
        toast.error(err.data?.message || err.message)
      }
    
      

    }
    
  return (
    <form onSubmit={submitHandler}>
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[50%] h-96 flex flex-col items-center justify-center shadow-2xl">
        <p className="text-lg font-semibold mb-10">Enter your email to receive OTP</p>
        <input
          type="email"
          className="border border-zinc-900"
          placeholder="enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="bg-blue-500 rounded-sm w-20 ml-2 mt-5" type="submit">
          Send OTP
        </button>
      </div>
    </div>
  </form>
  

  )
}
