
import { format } from 'date-fns'
import {LineChart,Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts'

export const PledgeChart = ({data}) => {




console.log(data)




  return (
    <div>

        <LineChart width={530} height={190} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="isCreatedAt" tickFormatter={(tick)=>format(new Date(tick),'MM/dd/yyyy')} /> */}
        <YAxis/>
        <Legend />
        <Tooltip/>
        <Line type="monotone" dataKey="payment" stroke="#8884d8"  animationDuration={2000} animationBegin={0} />
        

        </LineChart>
        
    </div>
  )
}
