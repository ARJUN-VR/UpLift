import React, { useEffect, useState } from "react";
import {
  useAddCategoryMutation,
  useBlockCategoryMutation,
  useEditCategoryMutation,
} from "../../redux/slices/adminApiSlice";
import Loader from "../userComponents/Loader";
import { toast } from "react-toastify";
import { useListCategoryMutation } from "../../redux/slices/userApiSlice";
import { catlist } from "../userComponents/campaignComponents/Basics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const Category = () => {
  const [name, setName] = useState<string>("");
  const [catList, setCatList] = useState<catlist[]>([]);
  const [change, setChange] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedCategory, setEditedCategory] = useState<string>("");
  const [editName,setEditName] = useState<string>('')

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const [fetchcategory] = useListCategoryMutation();

  const [blockCategory] = useBlockCategoryMutation();

  const [editCategory] = useEditCategoryMutation();

  useEffect(() => {
    const fetch = async () => {
      const list = await fetchcategory("").unwrap();
      setCatList(list.list);
    };
    fetch();
  }, [fetchcategory, change,editMode]);

  const add = async () => {
    try {
      await addCategory({ name }).unwrap();
      setChange(!change);
      setName("");
      toast.success("category added");
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  const categoryAction = async (name: string) => {
    try {
      const res = await blockCategory({ name }).unwrap();

      console.log(res);

      setChange(!change);
      if (res.catData[0].isListed) {
        toast.success("category unblocked");
      } else {
        toast.success("category blocked");
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  const editHandler = async(categoryId:string,newName:string)=>{
    try{
      await editCategory({categoryId,newName}).unwrap()
      toast.success('changed')
      setEditMode(false)
    }catch(error){
      console.log(error)
      toast.error(error.data.message)
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
          onChange={(e) => setName(e.target.value)}
        />
        {isLoading ? <Loader /> : <></>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={add}
        >
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
                {editMode && editedCategory === category.name ? (
                  
                  <td className="border px-4 py-2">
                    <div className="flex justify-between">
                      
                    <input type="text" value={editName} className="bg-blue-200" onChange={(e)=>setEditName(e.target.value)} />
                    <div className="space-x-3 text-white font-medium">
                      <button className="bg-red-500 rounded-md p-2" onClick={()=>setEditMode(false)}>cancel</button>
                    <button className="bg-green-500 rounded-md p-2" onClick={()=>editHandler(category._id,editName)}>change</button>
                    </div>
                    </div>
                    
                  </td>
                ) : (
                  <td className="border px-4 py-2">
                  <div className="flex justify-between">
                     <span>{category.name}</span>
                     <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => {
                      setEditMode(true);
                      setEditedCategory(category.name);
                      setEditName(category.name)
                    }}
                  />
                  </div>
                  </td>
                )}

                <td className="border px-4 py-2 flex justify-center space-x-2">
                  <button
                    className={`${
                      category.isBlocked
                        ? `bg-green-500  hover:bg-green-600`
                        : `bg-red-500 hover:bg-red-600`
                    }text-white py-1 px-2 rounded-md`}
                    onClick={() => categoryAction(category.name)}
                  >
                    {category.isBlocked ? "list" : "unlist"}
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
