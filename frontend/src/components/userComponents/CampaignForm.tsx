import React, { useEffect, useState } from "react";
import { useCreateCampaignMutation } from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export const CampaignForm = () => {
  const [showModal, setShowModal] = useState(false);

  const [campaignName, setCampaignName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [image, setImage] = useState<string>('');
  const [goal, setGoal] = useState<number>();
  const [endDate, setEndDate] = useState<Date>();
  const [userEmail, setUserEmail] = useState<string>("arjarjun@gmail.com");



const navigate = useNavigate()
  const {userInfo} = useSelector((state:RootState)=>state.auth)

  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  })




  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [create,{isLoading}] = useCreateCampaignMutation();

  const categoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parsedValue: number = parseInt(e.target.value);
    setGoal(parsedValue);
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedDate: Date = new Date(e.target.value);

    setEndDate(changedDate);
  };

  const createHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    try{

    
       await create({campaignName,category,story,image,goal,endDate,userEmail}).unwrap()
 
      toast.success('campaign created successfully')
      setShowModal(false)

    }catch(error){
      console.log(error,'errroror')
      toast.error(err?.data?.message || err.error)
    }
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files[0];
    console.log(imageFile)
  
    const setFileToBase64 = (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    setFileToBase64(imageFile);
  };
  

  const modalBackdropStyles = `fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ${
    showModal ? "block" : "hidden"
  }`;

  const modalContentStyles = `bg-gray-700 rounded-lg p-6 shadow-2xl w-[50%] h-[80%] text-center`;


  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-44"
        onClick={toggleModal}
      >
        Create Campaign
      </button>

      {/* Modal backdrop */}
      <div className={modalBackdropStyles} onClick={toggleModal}>
        {/* Modal content */}
        <div
          className={modalContentStyles}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">Campaign Form</h2>
          {/* Your form content goes here */}
          <form className="flex flex-col gap-3" onSubmit={createHandler}>
            <div className="bg-gray-700 flex  items-center w-full space-x-28">
              <div className="flex flex-col items-start ">
                <label htmlFor="text">Campaign Title</label>
                <input
                  type="text"
                  className="w-72 h-9 bg-gray-600 border border-white rounded-lg"
                  placeholder="Campaign name"
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="w-72 h-9 bg-gray-600 border border-white rounded-lg"
                  value={category}
                  onChange={categoryChange}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="science">Science</option>
                  <option value="film">Film</option>
                  <option value="technology">Technology</option>
                  <option value="games">Games</option>
                </select>
              </div>
            </div>



            <div className="bg-gray-700 ">

              <textarea
                className="w-full bg-gray-600 h-32 relative" // Adjust 'h-40' to set the desired height
                placeholder="Story"
                onChange={(e) => setStory(e.target.value)}
              ></textarea>
            </div>

            <div className="bg-gray-700 flex flex-row space-x-20">
              <div className="flex flex-col items-start">
                <label htmlFor="number">Goal Amount</label>
                <input
                  type="number"
                  className="w-72 h-9 bg-gray-600 border border-white rounded-lg"
                  placeholder="eg:200000"
                  onChange={handleGoalChange}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="date">End Date</label>
                <input
                  type="date"
                  className="w-72 h-9 bg-gray-600 border border-white rounded-lg"
                  onChange={handleDate}
                />
              </div>
            </div>
            <div className="bg-gray-700 space-x-5 mt-3 flex">
          {image?(
              <div className="bg-gray-500 w-1/2 h-36">
              
             <img src={image} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
            
              </div>
          ):(
            <div className="bg-gray-500 w-1/2 h-36 flex justify-center items-center">
            <label htmlFor="file" className="border-b border-white" >upload campaign image</label>
            <input
            id="file"
              type="file"
              onChange={imageHandler}
              accept="image/*"
              hidden
            />
          
            </div>
          )}
      </div>
      {isLoading && <Loader/>}

            <div className="flex justify-end">

              <button
                className="bg-blue-600 w-28 h-10 rounded-xl"
                type="submit"
              >
                Create
              </button>
 

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
