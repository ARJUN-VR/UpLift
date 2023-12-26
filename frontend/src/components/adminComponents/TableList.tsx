import { useState } from "react"
import { UserList } from "./UserList"


export const TableList = () => {
  const [user,setUser] = useState<string>('user')
 
  return (
    <div className="bg-white mt-40 ml-20 h-1/2 w-full mr-20  rounded-2xl">
        <div className=" w-80 h-7 ml-[31%] flex gap-40 ">
           <button className="font-sans font-semibold text-2xl" style={user=='user'?{ textDecoration: 'underline' }:{}} onClick={()=>setUser('user')}>users</button>
           <button className="font-sans font-semibold text-2xl" style={user == 'creator'?{textDecoration:'underline'}:{}} onClick={()=>setUser('creator')}>creators</button>

        </div>
        <div className="bg-red-100 w-full mt-5">
             
<UserList/>
 
        </div>
    </div>
  )
}
