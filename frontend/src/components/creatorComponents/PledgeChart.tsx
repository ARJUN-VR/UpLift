
import { format } from 'date-fns'
import {LineChart,Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts'

export const PledgeChart = ({data}) => {




    // const dataChart = [
    //     { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    //     { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    //     { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
    //     { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    //     { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
    //     { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
    //     { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
    //     { name: 'Page H', uv: 239, pv: 2400, amt: 2400 },
    //     { name: 'Page I', uv: 400, pv: 3200, amt: 2400 },
    //     { name: 'Page J', uv: 300, pv: 1398, amt: 2210 }
    // ];




  return (
    <div>

        <LineChart width={530} height={190} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="isCreatedAt" tickFormatter={(tick)=>format(new Date(tick),'MM/dd/yyyy')} />
        <YAxis/>
        <Legend />
        <Tooltip/>
        <Line type="monotone" dataKey="payment" stroke="#8884d8"  animationDuration={2000} animationBegin={0} />
        

        </LineChart>
        
    </div>
  )
}
