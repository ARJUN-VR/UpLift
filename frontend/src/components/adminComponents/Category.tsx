import React, { useEffect, useState } from 'react';
import { useAddCategoryMutation } from '../../redux/slices/adminApiSlice';
import Loader from '../userComponents/Loader';
import { toast } from 'react-toastify';
import { useListCategoryMutation } from '../../redux/slices/userApiSlice';
import { catlist } from '../userComponents/campaignComponents/Basics';

export const Category = () => {
    const [name,setName] = useState<string>('')
    const [catList,setCatList] = useState<catlist[]>([])
    const [change,setChange] = useState<boolean>(false)

    const [addCategory,{isLoading}] = useAddCategoryMutation()

    const [fetchcategory] = useListCategoryMutation()

    useEffect(()=>{
      const fetch = async()=>{
        const list = await fetchcategory('').unwrap()
        setCatList(list.list)
      }
      fetch()
    },[fetchcategory,change])


    const add = async()=>{
      try{
        await addCategory({name}).unwrap()
        setChange(!change)
        setName('')
        toast.success('category added')
      }catch(error){
        toast.error(error?.data?.message)
        console.log(error)
      }
     
    }





    return (
      <div className="w-full mt-10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Category</h2>
        <div className="bg-blue-400 p-6 rounded-lg">
          <input
            type="text"
            placeholder="Enter category"
            value={name}
            className="w-full p-2 mb-4 rounded-md border border-gray-400 focus:outline-none focus:border-green-500"
            onChange={(e)=>setName(e.target.value)}
          />
          {
            isLoading ? (
              <Loader/>
            ) : (
              <></>
            )
          }
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={add}>
            Add Category
          </button>
        </div>
        <div className="mt-6 w-full">
  <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
    <thead className="bg-gray-300">
      <tr>
        <th className="px-4 py-2">Category</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {catList.map((category, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
          <td className="border px-4 py-2">{category.name}</td>
          <td className="border px-4 py-2 flex justify-center space-x-2">
            <button className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600">List</button>
            <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">Unlist</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    );
    
};


