import CountUp from "react-countup"
import { BarChartAdmin } from "./AdminGraphs/BarChart";
import { PieChartAdmin } from "./AdminGraphs/PieChart";
import { AreaChartAdmin } from "./AdminGraphs/AreaChart";
import { useEffect, useState } from "react";
import { useGetDashBoardCountsMutation } from "../../redux/slices/adminApiSlice";


export const AdminCard = () => {
  const [campaignCount,setCampaignCount] = useState<number>(0)
  const [backersCount,setBackersCount] = useState<number>(0)
  const [Amount,setAmount] = useState<number>(0)
  


  const [getCounts] = useGetDashBoardCountsMutation()

  useEffect(()=>{
    const getData = async()=>{
      const data = await getCounts('').unwrap()
      setCampaignCount(data.data.campaignCount)
      setBackersCount(data.data.backers)
      setAmount(data.data.Amount)
      console.log(data)
    }
    getData()
  },[])
  console.log(campaignCount)
  return (
    <div className="bg-gray-300 p-10 w-full h-screen flex flex-col">

      {/* first layer  */}

      <div className="grid grid-cols-3 gap-5">
        {/* Live Campaigns */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-black font-semibold text-lg mb-2">Live Campaigns</span>
          <span className="text-blue-600 font-bold text-4xl">
            <CountUp end={campaignCount} duration={3}/>
          </span>
        </div>

        {/* Active backers */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-black font-semibold text-lg mb-2">Active Backers</span>
          <span className="text-blue-600 font-bold text-4xl">
            <CountUp end={backersCount} duration={3}/>
          </span>
        </div>

        {/* Total amount raised */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
    <span className="text-black font-semibold text-lg mb-2">Total Pledge</span>
  <span className="text-4xl font-bold text-blue-600">₹{Amount}</span>
   <span className="text-gray-600 text-sm">(45.67 Lakhs)</span>
       </div>
</div>


{/* second layer */}



<div className="mt-5 flex w-full justify-between">
<BarChartAdmin/>
<PieChartAdmin/>

</div>
{/* third Layer */}
<div className="mt-5 ">
<AreaChartAdmin/>
</div>


</div>
 
  );
}
