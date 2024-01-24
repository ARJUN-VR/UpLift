import React from 'react'
import { Header } from '../../components/userComponents/Header'
import { SideBar } from '../../components/userComponents/SideBar'
import { CampiagnMenu } from '../../components/userComponents/campaignComponents/CampiagnMenu'

export const SinglePageView = () => {

    
  return (
    <div className="bg-[#0c0c0c] h-screen flex flex-col overflow-y-auto">
    <Header/>
 
    <SideBar/> 
 

 <div className="ml-72">
 <CampiagnMenu />
 
 </div>
 
    </div>
  
 
  )
}
