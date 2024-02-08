import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { useCreateBasicsMutation, useListCategoryMutation } from "../../../redux/slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

export interface catlist{
  id:string,
  name:string
}

export const Basics = () => {
  const [title, setTitle] = useState<string>("");
  const [tagline,setTagline] = useState<string>('')
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>('');
  const [location, setLocation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [target,setTarget] = useState<number>(10000)

  const fileInputRef = useRef<HTMLInputElement>(null);


  const [catList,setCatList] = useState<catlist[]>([])

  const [fetchcategory] = useListCategoryMutation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchcategory('').unwrap();
        setCatList(data?.list)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const navigate = useNavigate()

const [ saveBasics,{isLoading} ] = useCreateBasicsMutation()

const submitHandler =async(e:React.FormEvent)=>{
  e.preventDefault()
  try {
if(!title){
  return toast.error('title is required')
}else if(!category){
  return toast.error('category is required')
}else if(!image){
  return toast.error('image is required')
}else if(!location){
  return toast.error('location is required')
}else if(!duration){
  return toast.error('duration is required')
}else if(!target){
  return toast.error('target is required')
}else if(!tagline){
  return toast.error('tagline is required')
}
 const basicRes = await saveBasics({title,tagline,category,target,image,location,duration}).unwrap()
   const basicId = basicRes?.data?._id
   localStorage.setItem('basicId',basicId)
   const a = 'done'
   localStorage.setItem('done',a)
  navigate('/create-campaign/advanced')
  } catch (error) {
    console.log(error)
  }


}

  const handleFileClick = () => {
    setImage('')
    fileInputRef?.current?.click();
  };

  const imageHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const imgFile =e.target?.files?.[0];


    const setFileToBase64 = (file: File | undefined) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    setFileToBase64(imgFile);
 
    
  }
  
  return (
    <div className="text-white ">
      <span className="text-3xl font-bold">Basics</span>
      <p>
        Make a good first impression: introduce your campaign objectives and
        entice people to learn more. This basic information will represent your
        campaign on your campaign page, on your campaign card, and in searches.
      </p>
     
      <div>
        <form onSubmit={submitHandler}>
          {/* Title */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaign title</span>
            <span className="text-gray-400 text-sm">
              What is the title of your campaign?
            </span>
            <Input
              placeHolder="campaign title"
              type="text"
              setInput={setTitle}
              value={title}
            />
          </div>
          {/* tagline */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">tagline</span>
            <span className="text-gray-400 text-sm">
            Provide a short description that best describes your campaign to your audience.
            </span>
            <Input
              placeHolder="tags"
              type="text"
              setInput={setTagline}
              value={tagline}
            />
          </div>
          {/* Category */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaign category</span>
            <span className="text-gray-400 text-sm">
              To help backers find your campaign, select a category that best
              represents your project.
            </span>
            <select
              className="w-80 h-7 rounded-md mt-2 text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              {
                catList.map((data)=>{
             return <option value={data.name}>{data.name}</option>
              
                })
              }
        

              {/* Add more options as needed */}
            </select>
          </div>
          {/* Image */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaign card image</span>
            <span className="text-gray-400 text-sm">
              Upload a square image that represents your campaign.640 x 640
              recommended resolution, 220 x 220 minimum resolution.
            </span>
           {image?(
            <>
           <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
            <img src={image} alt="campaign image" style={{maxWidth:'100%',height:'100%'}} />
           </div>
           <button className=" text-white font-bold w-20 mt-3 " onClick={handleFileClick}>change</button>
            </>
       
          
           ):(
             <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={imageHandler}
              />
              <label htmlFor="fileInput" onClick={handleFileClick}>
                Click here to upload image
              </label>
            </div>
           )}
          </div>
          {/* location */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">Location</span>
            <span className="text-gray-400 text-sm">
              Choose the location where you are running the campaign. This
              location will be visible on your campaign page for your audience
              to see.
            </span>
            <Input
              placeHolder="  location"
              type="string"
              setInput={setLocation}
              value={location}
            />
          </div>
          {/* Duration */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaign duration</span>
            <span className="text-gray-400 text-sm whitespace-normal max-w-[70%] ">
              How many days will you be running your campaign for? You can run a
              campaign for any number of days, with a 60 day duration maximum.
              Keep in mind that you will be able to extend as many times as you
              want up until the 60 day duration maximum!
            </span>
            <Input
              placeHolder="    eg:-50days"
              type="number"
              setInput={setDuration}
              value={duration}
            />
          </div>
          {isLoading?(
          <Loader/>
        ):(
          <div></div>
        )}
          {/* Target amount */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">target amount</span>
            <span className="text-gray-400 text-sm whitespace-normal max-w-[70%] ">
              How many days will you be running your campaign for? You can run a
              campaign for any number of days, with a 60 day duration maximum.
              Keep in mind that you will be able to extend as many times as you
              want up until the 60 day duration maximum!
            </span>
            <input type="number" className="w-80 h-7 rounded-md mt-5 text-black" value={target} onChange={(e)=>setTarget(Number(e.target.value))} max={100000} />
          </div>
          {/* footer  */}
          <div className="h-52 w-full  flex items-center justify-end">
            <button className="bg-blue-500 w-36 h-12 mr-20" type="submit">
              save&continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
