
import { Chart } from "react-google-charts";
export const DonutChartAdmin = () => {
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7], // CSS-style declaration
      ];
      const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
      };
  return (
    <div >
         <Chart
      chartType="PieChart"
      width="100%"
      height="250px"
      data={data}
      options={options}
    />
    </div>
  )
}
