import { PledgeChart } from "./PledgeChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpLong,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import React, { Suspense, useEffect, useState } from "react";
import {
  useGetDashboardDataMutation,
  useGetPaymentDataMutation,
} from "../../redux/slices/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CountUp from "react-countup";
import Loader from "../userComponents/Loader";

export interface PaymentProp {
  userEmail: string;
  payment: number;
  isCreatedAt: Date;
}

const LazyBackersTable = React.lazy(() => import("./BackersTable"));

export const CreatorDashboard = () => {
  const [campaignId, setCampaignId] = useState<string>("");
  const [backers, setBackers] = useState<number>(0);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [tableData, setTableData] = useState<PaymentProp[]>([]);

  const [getDashboardData, { isLoading }] = useGetDashboardDataMutation();
  const [getPayments, { isLoading: paymentLoading }] =
    useGetPaymentDataMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const creatorEmail = userInfo.result.user.email;

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getDashboardData(creatorEmail).unwrap();

        const dashboardData = data.data[0];

        setCampaignId(dashboardData._id);
        setBackers(dashboardData.backers);
        setCurrentAmount(dashboardData.currentAmount);
        setTarget(dashboardData.target);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [creatorEmail, getDashboardData]);

  useEffect(() => {
    try {
      const fetchPayments = async () => {
        const data = await getPayments(campaignId).unwrap();
        setTableData(data.paymentData);
      };
      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  }, [campaignId, getPayments]);

  console.log(backers);

  return (
    <div className="flex flex-col pr-5 pl-5">
      <div className=" flex p-2 bg-[#808080] rounded-lg ">
        {/* backers count */}
        <div className="w-72 bg-[#141414] h-52 pl-3 ml-3 rounded-lg ">
          <div className="text-white flex justify-between pr-3 items-center  text-2xl  ">
            <span className=" font-semibold">Backers</span>
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
          <div className="mt-10 flex justify-center">
            <span className="text-blue-600 font-bold text-7xl">
              <CountUp end={backers} duration={3} />
            </span>

            <FontAwesomeIcon
              icon={faArrowUpLong}
              className="text-green-600 font-semibold text-4xl"
            />
          </div>
        </div>
        {/* pledges count */}
        <div className="w-72 bg-[#141414] h-52 pl-3 ml-5 rounded-lg ">
          <div className="text-white flex justify-between items-center pr-5 text-2xl">
            <span className=" font-semibold">Total pledges</span>
            <FontAwesomeIcon icon={faWallet} />
          </div>
          <div className="mt-10 flex items-center flex-col">
            <span className="text-blue-400 font-bold text-4xl">
              {" "}
              ₹<CountUp end={currentAmount} duration={3} />
            </span>
            <span className="text-gray-400 font-semibold">out of</span>
            <span className="text-green-400 font-bold text-4xl">
              {" "}
              ₹<CountUp end={target} duration={3} />
            </span>
          </div>
        </div>

        {!isLoading && !paymentLoading && (
          <div className=" bg-[#141414] ml-10 p-2 rounded-lg">
            <PledgeChart />
          </div>
        )}
      </div>

      {!paymentLoading && (
        <div className="mt-5 h-96 overflow-hidden rounded-lg">
          <div className="h-full overflow-auto">
            <Suspense fallback={<Loader />}>
              <LazyBackersTable BackersData={tableData} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};
