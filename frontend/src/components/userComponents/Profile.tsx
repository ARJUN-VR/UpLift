import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"


export const Profile = () => {
  return (
<div className="bg-gray-700 h-full p-1 rounded-2xl flex"><div className="m-10 w-[45vh]">
  <div className="rounded-lg border bg-[#526D82] px-4 pt-8 pb-10 shadow-lg mt-[60px]">
    <div className="relative mx-auto w-36 rounded-full">
      <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
      <img className="mx-auto h-auto w-full rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="profile pic" />
    </div>
    <span ><FontAwesomeIcon icon={faPenToSquare} /></span>
    <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">Michael Simbal</h1>

    
    <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">

    <li className="flex items-center py-3 text-sm">
        <span>Email</span>
        <span className="ml-auto">michael@gmail.com</span>
      </li>
     
      <li className="flex items-center py-3 text-sm">
        <span>Joined On</span>
        <span className="ml-auto">Apr 08, 2022</span>
      </li>
    </ul>
  </div>
</div>
<div className="w-[700px] h-[500px] bg-violet-200 flex gap-x-3 mt-8 ml-10 rounded-2xl" >
<div className="bg-gray-600 w-full rounded-2xl flex gap-x-48 pt-4">
  <Link to={''} className="pl-44 text-white font-bold">Intersted</Link>
  <Link to={''} className="text-white font-bold">Backed</Link>

</div>


</div>

</div>


  )
}
