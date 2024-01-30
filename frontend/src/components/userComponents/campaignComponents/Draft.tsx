import { CampiagnMenu } from "./CampiagnMenu";
import { RewardCard } from "../RewardCard";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Draft = () => {


  const navigate = useNavigate()

 
  useEffect(() => {
    const result = localStorage.getItem('done');

    if (result === null) {
      navigate('/create-campaign');
    }
  }, [navigate]);

  const openModal = () => {
    localStorage.removeItem('done')
    Swal.fire({
      title: 'Congratulations!',
      text: 'Your request has been sent. Our admin team will review and verify it shortly.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result)=>{
      if(result.isConfirmed){
        navigate('/')
      }

    })
  };


  return (

    <div>
    <CampiagnMenu/>

    <div className="mt-9  flex">
        <div className="w-1/3 border-r  pt-3">
        <RewardCard/>
        </div>
        <div className=" flex w-2/3 items-center  pt-2  flex-col px-10">
            <span className="text-3xl font-bold text-white">Make it live!</span>
            <div className="w-full pl-3 pt-3">
            <p className="text-white font-medium">
  Before your campaign goes live, our admin team will carefully review and verify the details to ensure compliance with our guidelines. This process is in place to maintain the integrity of our platform and provide a positive experience for both creators and backers.<br/><br/>

  Once the verification is complete and your campaign is approved, it will be set live, and you'll be notified promptly. We understand the anticipation and excitement surrounding your project, and we're here to support you every step of the way. If you have any questions or need further assistance, feel free to reach out to our support team.<br/><br/>
</p>


<p className="text-white font-medium">
  As you await approval, consider sharing a sneak peek of your project with friends and followers on social media. Building early excitement can be a powerful way to garner support when your campaign officially goes live. We appreciate your dedication to creating something extraordinary, and we can't wait to see your vision come to life on our platform. Thank you for choosing us to be a part of your crowdfunding journey.<br/><br/>
</p>


            </div>
            <button className="w-96 rounded-sm font-bold text-white bg-green-500 h-10" onClick={openModal}>publish</button>
            
        </div>
    </div>
    {/* footer */}
    <div className="h-10">
       
    </div>
    </div>

  );
};
