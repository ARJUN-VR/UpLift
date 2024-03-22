import  { useEffect, useState } from "react";
import { useGetRewardMutation } from "../../redux/slices/userApiSlice";
import { useParams } from "react-router-dom";

export const RewardCard = () => {

  const [title,setTitle] = useState<string>('')
  const [price,setPrice] = useState<number>()
  const [items,setItems] = useState<string[]>([])
  const [image,setImage] = useState<string>('')






  let idd:string | null;
  const {id}  = useParams()

  const idByView = id?.slice(1)
  console.log(idByView)

  const idByDraft = localStorage.getItem("basicId");



  if(idByView){
    idd = idByView
  }else{
    idd = idByDraft
  }
  
  const [getReward] = useGetRewardMutation();

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log('getting...')
        const data = await getReward(idd).unwrap();

        setTitle(data.reward.title)
        setPrice(data.reward.pledgeAmount)
        setImage(data.reward.image)
        setItems(data.reward.rewardList)

        console.log(data,'reward data')
      }catch(error){
        console.log(error)
      }
     
    };
    fetchData();
  },[getReward,id]);

  return (
    <div className="w-72 bg-[#16141c] min-h-[400px] flex flex-col rounded-xl">
      <div className="w-full h-[45%] bg-green-300 rounded-xl overflow-hidden">
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex flex-col pl-5">
        <span className="text-2xl text-white font-medium">
          {title}
        </span>
        <span className="text-2xl text-white font-bold pt-2">Rs₹.{price}</span>
        <span className="text-lg text-white font-medium pt-2">
          included items
        </span>
        <ul className="text-white list-disc pl-10">
          {items.map(()=>{

         return   <li>items</li>

          })}

        </ul>
        <span className="text-lg text-white font-medium pt-2">
          Estimated shipping
        </span>
        <span className="text-sm text-white font-medium ">april 2034</span>
        <div className="h-5"></div>
      </div>
    </div>
  );
};
