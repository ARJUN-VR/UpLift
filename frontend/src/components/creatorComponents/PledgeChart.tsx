
import {LineChart,Line, CartesianGrid, YAxis, Tooltip, Legend} from 'recharts'
import { PaymentProp } from './CreatorDashboard'

interface PaymentDataProp{
  data:PaymentProp[]
}

export const PledgeChart = ({data}:PaymentDataProp) => {




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
