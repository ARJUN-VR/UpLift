import { useState } from "react";
import { RewardCard } from "./RewardCard";

export const Payment = ({ close , name, desc,campaignId}) => {

  const [amount,setAmount] = useState<number>(0)



  const closeModal = () => {
    close();
  };



  const handlePayment = async () => {
    try {

      const res = await fetch('http://localhost:8000/api/user/payment', {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({
          // Convert the request body to a JSON string
          title:name,
          amount: amount,
          description:desc
        }),
      });


      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        console.error("Request failed with status", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const pledgeAmount = ''+amount

  const setValues =()=>{

    localStorage.setItem('camapign',campaignId)
    localStorage.setItem('amount',pledgeAmount)

  }



  return (
    <div className="relative w-[50%] bg-gray-800  overflow-y-auto flex items-center flex-col">
       <button
      onClick={closeModal}
      className="text-white hover:text-red-700 focus:outline-none absolute top-10 right-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
      <span className="font-bold mt-10 text-2xl text-white">Back this project</span>
     
      <div className="h-20 bg-gray-900 w-full mt-10 flex  items-center mb-5">
        <span className="ml-10 text-white font-bold">make contributions</span>

        {/* contribution */}
        <div className="relative">
          <span className="absolute left-0 flex items-center pl-2 text-gray-100">
            ₹
          </span>
          <input type="number" className="h-5 ml-8 pl-2" onChange={(e)=>setAmount(parseInt(e.target.value))} />
        </div>
        <button className="bg-green-400 w-40 text-white font-semibold rounded-sm ml-20 h-8" onClick={()=>{handlePayment(),setValues()}}>pledge</button>
      </div>

      {/* reward */}
      <div className="flex justify-start w-full  bg-gray-800 ">
        <div className="w-1/2">
        <RewardCard />
        </div>
    <div className="flex items-center bg-gray-800 w-full flex-col text-white px-10">
      <span className="text-xl mt-2 mb-5 font-semibold">Reward</span>
      <p>Rewards inspire support, offering backers exclusive benefits, from early access to unique products. They recognize contributions, creating a sense of partnership. Exciting perks like limited editions or acknowledgments enrich the backer experience, fostering engagement. Your support goes beyond a transaction; it becomes a meaningful collaboration with tangible, valuable returns</p>
      <button className="mt-10 bg-blue-700 w-40 h-10 rounded-md">Claim</button>
    </div>
     </div>

    </div>
  );
};
