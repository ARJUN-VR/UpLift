import { useState } from "react"
import { toast } from "react-toastify"
import { useChangePasswordMutation } from "../../redux/slices/userApiSlice"
import { useNavigate } from "react-router-dom"


export const SetNewPassowrd = () => {
    const [password,setPassword] = useState<string>('')
    const [cpass,setCpass]  = useState<string>('')

    const [changePassword] = useChangePasswordMutation()
    const navigate = useNavigate()

    const confirmHandler=async(event:React.FormEvent)=>{
        event.preventDefault()
        try{
          if(password!=cpass){
            toast.error('passwords do not match!')
        }else{
          const email = localStorage.getItem('email')
          await changePassword({email,password}).unwrap()
          localStorage.removeItem('email')
          toast.success('password changed successfully')
          navigate('/login')
        }
        }catch(error){
          toast.error('failed to change password')
        }
       

    }

  return (
<form onSubmit={confirmHandler}>
  <div className="flex justify-center items-center h-screen">
    <div className="bg-white w-[50%] h-96 flex items-center justify-center flex-col space-y-5 shadow-2xl">

      <p className="text-lg font-semibold mb-4">Please enter a new password</p>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={cpass}
        onChange={(event) => setCpass(event.target.value)}
      />

      <button type="submit" className="bg-blue-500 rounded-sm w-20 ml-2">
        Confirm
      </button>
    </div>
  </div>
</form>


  )
}
