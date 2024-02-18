
import { PledgeChart } from "./PledgeChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong, faUserGroup, faWallet } from "@fortawesome/free-solid-svg-icons";

export const CreatorDashboard = () => {
  return (
    <div className="flex">
      <div className=" flex p-5 ">
        <div className="w-72 bg-[#141414] h-52 pl-3 ml-5 rounded-lg ">
          <div className="text-white flex justify-between items-center pr-5 text-2xl  ">
          <span className=" font-semibold">Backers</span>
          <FontAwesomeIcon icon={faUserGroup}  />
          </div>
          <div className="mt-10 flex justify-center">
            <span className="text-blue-600 font-bold text-7xl">125</span>
            <FontAwesomeIcon icon={faArrowUpLong}  className="text-green-600 font-semibold text-4xl"/>
          </div>

        </div>
        <div className="w-72 bg-[#141414] h-52 pl-3 ml-5 rounded-lg ">
          <div className="text-white flex justify-between items-center pr-5 text-2xl">
          <span className=" font-semibold">Total pledges</span>
          <FontAwesomeIcon icon={faWallet} />
          </div>
          <div className="mt-10 flex items-center flex-col">
            <span className="text-blue-400 font-bold text-4xl"> ₹40,566</span>
            <span className="text-gray-400 font-semibold">out of</span>
            <span className="text-green-400 font-bold text-4xl"> ₹40,566,90</span>

          </div>

        </div>
        <div className=" bg-[#141414] ml-10 p-2 rounded-lg">
        <PledgeChart/>
        </div>
      </div>
    </div>
  );
};
