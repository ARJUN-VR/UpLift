
import { PaymentProp } from './CreatorDashboard'

interface BackersTableProp{
  BackersData:PaymentProp[]
}
 const BackersTable = ({BackersData}:BackersTableProp) => {




  return (
    <div className="table-container  ">
    <table className="min-w-full divide-y divide-gray-200 bg-gray-800 text-white shadow-md ">
  <thead className="bg-gray-800 sticky top-0">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Backers</th>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Pledges</th>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
    </tr>
  </thead>
  <tbody className="bg-gray-900 divide-y divide-gray-200">
    {BackersData.map((backer)=>(
 <tr>
 <td className="px-6 py-4 whitespace-nowrap">{backer.userEmail}</td>
 <td className="px-6 py-4 whitespace-nowrap">{backer.payment}</td>
 <td className="px-6 py-4 whitespace-nowrap">{new Date(backer.isCreatedAt).toLocaleString()}</td>
 <td className="px-6 py-4 whitespace-nowrap">$2000</td>
</tr>
    ))}
   
    {/* Add more rows as needed */}
  </tbody>
</table>
  </div>
  )
}

export default BackersTable
