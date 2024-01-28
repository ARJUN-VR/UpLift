import React, { useEffect, useState } from "react";
import { useListCommentMutation, usePostCommentMutation } from "../../../redux/slices/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import Loader from "../Loader";

interface CommentProps {
  campaignid: string;
}

interface CommentData{
    userName:string,
    comment:string
}

export const CommentBox = ({ campaignid }: CommentProps) => {
  const [comment, setComment] = useState<string>("");
  const [commentData,setCommentData] = useState<CommentData[]>([])




  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [post, { isLoading:postLoading }] = usePostCommentMutation();
  const [getComments,{isLoading:commentLoading}] = useListCommentMutation()

  const PostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userInfo) {
        return toast.info("sign in to add comment");
      }

      const userName = userInfo.result.user.name;

      await post({ comment, userName, campaignid }).unwrap();
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error("error in commentBox");
    }
  };



  useEffect(()=>{

    const getCommentList = async()=>{
        const list = await getComments(campaignid).unwrap()
        setCommentData(list.comments[0])
    }
    getCommentList()

  },[campaignid,getComments])


  return (
    <>
    <div className="pt-10 pb-2 pl-10 text-white ">
      <form onSubmit={PostComment} className="w-full  space-x-5">
        <input
          type="text"
          value={comment}
          className="bg-gray-900 w-3/4 rounded-sm pl-5"
          placeholder="add a comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-blue-500 w-20 h-10 rounded-md font-semibold text-md"
          type="submit"
        >
          post
        </button>
      </form>
      {postLoading ? <Loader /> : <div></div>}
    </div>

    {/*comment list  */}
    <div className="bg-red-800 w-full  p-5">
       <div className="bg-red-600 h-14 mb-2 flex flex-col space-y-1">
<span className="text-gray-200">username</span>
<span className="text-white">hello</span>


       </div>
       <div className="bg-red-600 h-14">

</div>
    </div>
    </>

  );
};
