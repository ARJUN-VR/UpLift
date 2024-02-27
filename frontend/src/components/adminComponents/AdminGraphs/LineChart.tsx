import React, { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  ReferenceArea
} from "recharts";
import { useGetLineChartMutation } from "../../../redux/slices/adminApiSlice";

export const LineChartAdmin = () => {
  const [getLineData] = useGetLineChartMutation();
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLineData("").unwrap();
        console.log(data);
        // Transforming data to include a new field 'monthYear'
        const transformedData = data.data.map((item) => ({
          ...item,
          monthYear: `${item._id.month}/${item._id.year}`,
        }));
        console.log(transformedData);
        setLineData(transformedData);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl">
      <span className="font-semibold text-md text-blue-500 ml-3">Monthly user registration</span>
      
      <LineChart
        width={1230}
        height={250}
        data={lineData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <ReferenceArea y1={1000} y2={200} fill="#8884d8" fillOpacity={0.9} /> 
      </LineChart>
    </div>
  );
};
