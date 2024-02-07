import React, { useState } from 'react';
import { useAddCategoryMutation } from '../../redux/slices/adminApiSlice';
import Loader from '../userComponents/Loader';
import { toast } from 'react-toastify';

export const Category = () => {
    const [name,setName] = useState<string>('')

    const [addCategory,{isLoading}] = useAddCategoryMutation()


    const add = async()=>{
      try{
        await addCategory({name}).unwrap()
        toast.success('category added')
      }catch(error){
        toast.error(error?.data?.message)
        console.log(error)
      }
     
    }





  return (
    <div className="w-full mt-10 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 ">Category</h2>
      <div className="bg-blue-400 p-6 rounded-lg">
        <input
          type="text"
          placeholder="Enter category"
          value={name}
          className="w-full p-2 mb-4 rounded-md border border-gray-400 focus:outline-none focus:border-green-500"
          onChange={(e)=>setName(e.target.value)}
        />
        {
          isLoading?(
            <Loader/>
          ):(
            <></>
          )
        }
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={add} >
          Add Category
        </button>
      </div>
    </div>
  );
};


