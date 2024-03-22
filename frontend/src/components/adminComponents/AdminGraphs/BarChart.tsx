import  { useEffect, useState } from "react";
import { format } from 'date-fns'
import {
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";
import { useGetPaymentsDataMutation } from "../../../redux/slices/adminApiSlice";


export const BarChartAdmin = () => {
  const [paymentData,setPaymentData] = useState<string[]>([])


  const [getPayments] = useGetPaymentsDataMutation()

  useEffect(()=>{
    const getData = async()=>{
      const data = await getPayments('').unwrap() 
      console.log(data)
      setPaymentData(data.data)
    }
    getData()
  },[getPayments])

  console.log(paymentData)
  

  return (
    <div className="bg-white rounded-xl ">
      <span className="font-semibold text-md text-blue-500 ml-3">Daily amount raised</span>

      <BarChart width={815} height={250} data={paymentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
        dataKey="isCreatedAt" 
        tickFormatter={(tick) => format(new Date(tick), 'MM/dd/yyyy')} // Format timestamp
      />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="payment" fill="#8884d8" />
        
      </BarChart>
    </div>
  );
};
