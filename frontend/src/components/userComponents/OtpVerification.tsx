import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyOTPMutation } from "../../redux/slices/userApiSlice";
import { useSendOTPMutation } from "../../redux/slices/userApiSlice";

export const OtpVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const [resendVisible,setResendVisible] = useState<boolean>(false)
  const [resendTimer,setResendTImer] = useState<number>(60)

  



  const navigate = useNavigate();
  const [otpVerify] = useVerifyOTPMutation();
  const [sendOTP] = useSendOTPMutation()

  const verify = async () => {
    try {
      const newOtp: number = +otp;
      const email = localStorage.getItem("email");
      await otpVerify({ email, newOtp }).unwrap();
      toast.success("otp verified");
      navigate("/setpass");
    } catch (err) {
      console.log(err);
    }
  };

  const resendOtp =async() =>{
    try{
      const email = localStorage.getItem("email");
      await sendOTP({email}).unwrap()
      setResendVisible((prev)=>!prev)
      setResendTImer(60)
      toast.success('OTP sent')


    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    if(resendTimer>0){
      const timer = setTimeout(()=>{

        setResendTImer((prevTimer)=>prevTimer-1)

      },1000)
      return ()=>clearTimeout(timer)
    }else{
      setResendVisible(true)
    }
  },[resendTimer])

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-white w-[50%] h-96 flex flex-col items-center justify-center shadow-2xl">
      <h1 className="text-xl font-bold mb-4">Enter OTP</h1>
      <input
        type="text"
        className="border-black m-5"
        placeholder="enter OTP"
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
      />
      <button className="bg-blue-500 rounded-sm w-20 ml-2" onClick={verify}>
        Verify
      </button>
      {resendVisible ? (
        <button onClick={resendOtp} className="mt-5">Resend OTP</button>
      ) : (
        <span className="m-5">Resend OTP in {resendTimer}</span>
      )}
    </div>
  </div>
  
  );
};
