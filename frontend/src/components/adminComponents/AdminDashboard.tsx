import CountUp from "react-countup"
import { BarChartAdmin } from "./AdminGraphs/BarChart";
import { PieChartAdmin } from "./AdminGraphs/PieChart";
import { AreaChartAdmin } from "./AdminGraphs/AreaChart";


export const AdminCard = () => {
  return (
    <div className="bg-gray-300 p-10 w-full h-screen flex flex-col">

      {/* first layer  */}

      <div className="grid grid-cols-3 gap-5">
        {/* Live Campaigns */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-black font-semibold text-lg mb-2">Live Campaigns</span>
          <span className="text-blue-600 font-bold text-4xl">
            <CountUp end={30} duration={3}/>
          </span>
        </div>

        {/* Active creators */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-black font-semibold text-lg mb-2">Active Creators</span>
          <span className="text-blue-600 font-bold text-4xl">
            <CountUp end={70} duration={3}/>
          </span>
        </div>

        {/* Total amount raised */}
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
    <span className="text-black font-semibold text-lg mb-2">Total Pledge</span>
  <span className="text-4xl font-bold text-blue-600">₹45,678,09</span>
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
