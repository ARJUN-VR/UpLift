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
      <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
        <span className="text-2xl"
          ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
            <path fill="currentColor" d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z" className="clr-i-outline clr-i-outline-path-1" />
            <circle cx="23.01" cy="20" r="1.5" fill="currentColor" className="clr-i-outline clr-i-outline-path-2" />
            <path fill="none" d="M0 0h36v36H0z" /></svg></span
        ><span className="">Rewards(optional)</span>
      </li>
      <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></span
        ><span className="">Payments</span>
      </li>
      <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span
        ><span className="">Preview</span>
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
