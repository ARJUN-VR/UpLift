import React from 'react'
import { Header } from '../../components/userComponents/Header'
import { SideBar } from '../../components/userComponents/SideBar'
import { Category } from '../../components/userComponents/Category'


export const CategoryPage = () => {
  return (
    
    <div className="bg-[#0c0c0c] min-h-screen">
    <Header/>
    <div className="flex">
      <div className="sticky">
        <SideBar/> 
      </div>
      <div>
       <Category/>
      </div>
    </div>
 </div>
  )
}
