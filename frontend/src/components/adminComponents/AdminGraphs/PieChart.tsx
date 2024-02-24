import React, { useEffect, useState } from 'react'
import {Chart} from 'react-google-charts'
import { useGetPieChartMutation } from '../../../redux/slices/adminApiSlice'

export const PieChartAdmin = () => {
  const [pieData,setPieData] = useState<string[]>([])


  const [getCategoryData] = useGetPieChartMutation()

  useEffect(()=>{
    const getData = async()=>{
      const data = await getCategoryData('').unwrap()
      console.log(data)
      setPieData(data.data)
    }
    getData()
  },[])

  const options = {
    title: "campaigns category wise",
    pieHole: 0.2,
    is3D: true,
  };
 
  return (
    <div className='bg-white rounded-xl flex items-center '>
       <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={pieData}
      options={options}
    />
    </div>
  )
}
