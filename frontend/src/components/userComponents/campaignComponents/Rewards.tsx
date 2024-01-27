import React, { useRef, useState } from 'react'
import { Input } from './Input'
import { useCreateRewardMutation } from '../../../redux/slices/userApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'


export const Rewards = () => {
    const [title,setTitle] = useState<string>('')
    const [reward,setReward] = useState<string>('')
    const [delivary,setDelivary] = useState<string>('')
    const [image,setImage] = useState<string>('')
    const [pledge,setPledge] = useState<number>(25)

    const [rewardList,setRewardList] = useState<string[]>([])

    const addReward =(e:React.FormEvent)=>{
        e.preventDefault()
        setRewardList([...rewardList,reward])
        setReward('')
    }
    const [saveReward,{isLoading}] = useCreateRewardMutation()

    const navigate = useNavigate()


    const fileInputRef = useRef<HTMLInputElement>(null);
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
      

    const submitHandler=async(e:React.FormEvent)=>{
      e.preventDefault()
      try {
        const basicId = localStorage.getItem('basicId')
        await saveReward({title,rewardList,pledge,delivary,image,basicId}).unwrap()
        navigate('/create-campaign/draft')

        
      } catch (error) {
        toast.error(error?.data?.message)
        console.log(error)
      }


    
    }
  return (
    <div className="text-white">
      <span className="text-3xl font-bold">Reward(optional)</span>
      <p>
        Make a good first impression: introduce your campaign objectives and
        entice people to learn more. This basic information will represent your
        campaign on your campaign page, on your campaign card, and in searches.
      </p>
      <div>
        <form onSubmit={submitHandler}>
          {/* Title */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">Reward title</span>
            <span className="text-gray-400 text-sm">
              What is the title of your reward?
            </span>
            <Input
              placeHolder="campaign title"
              type="text"
              setInput={setTitle}
              value={title}
            />
          </div>
          {/* Reward List */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">Add Rewards</span>
            <span className="text-gray-400 text-sm">
            Provide a short description that best describes your campaign to your audience.
            </span>
            <div className='flex'>
            <Input
              placeHolder="reward"
              type="text"
              setInput={setReward}
              value={reward}
            />
            <button className='text-3xl ml-5 mt-2' onClick={addReward}>+</button>
            </div>
            <div className='ml-10 mt-5'>
            <ul className='list-disc'>
            {rewardList.map((item,index)=>(
                <li key={index}>{item}</li>
            ))}
         </ul>
            </div>
       
          </div>

             {/* estimated delivary */}
             <div className="mt-10 flex flex-col">
            <span className="text-2xl">Estimated delivary</span>
            <span className="text-gray-400 text-sm">
            Provide a estimated delivary date for your backers
            </span>
            
            <Input
              placeHolder="eg:-april 2024"
              type="text"
              setInput={setDelivary}
              value={delivary}
            />
          
           {isLoading ? (
            <Loader/>
           ):(
            <div></div>
           )}
          
          </div>
     
          {/* Image */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">Reward Image(optional)</span>
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
        
          {/* pledge amount */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">pledge amount</span>
            <span className="text-gray-400 text-sm whitespace-normal max-w-[70%] ">
              How many days will you be running your campaign for? You can run a
              campaign for any number of days, with a 60 day duration maximum.
              Keep in mind that you will be able to extend as many times as you
              want up until the 60 day duration maximum!
            </span>
            <input type="number" className="w-80 h-7 rounded-md mt-5 text-black" value={pledge} onChange={(e)=>setPledge(Number(e.target.value))} max={100000} />
          </div>
         
          {/* footer */}
          <div className="h-52 w-full  flex items-center justify-end">
            <button className="bg-blue-500 w-36 h-12 mr-20" type="submit">
              save&continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
