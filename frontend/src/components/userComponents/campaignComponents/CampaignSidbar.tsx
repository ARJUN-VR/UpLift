import { useNavigate } from "react-router-dom"

export const CampaignSidbar = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen  w-72 bg-gray-500 fixed">
    {/* <!-- Sidebar --> */}
  <div className="absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white">
    <h1 className="mt-10 ml-10 text-3xl font-bold">UpLift</h1>
    <ul className="mt-20 space-y-3">
      <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600" onClick={()=>{navigate('/create-campaign')}}>
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></span
        ><span className="">Basics</span>
      </li>
     
      <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600" onClick={()=>navigate('/create-campaign/advanced')}>
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></span
        ><span className="">Advanced</span>
      </li>
     
    </ul>

    <div className="my-6 mt-auto ml-10 flex cursor-pointer">
      <div>
        <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
      </div>
      <div className="ml-3">
        <p className="font-medium">Palmer</p>
        <p className="text-sm text-gray-300">Kiev, Ukraine</p>
      </div>
    </div>
  </div>
  {/* <!-- /Sidebar --> */}
</div>

  )
}
