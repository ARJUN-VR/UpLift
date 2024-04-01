import React, { Suspense, lazy, useEffect, useState } from "react";
import { useListCommentMutation, usePostCommentMutation } from "../../../redux/slices/userApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import Loader from "../Loader";

const CommentList = lazy(()=>import('./CommentList'))

interface CommentProps {
  campaignid: string;
}

export interface CommentData{
  _id:string,
    userName:string,
    comment:string
}

export const CommentBox = ({ campaignid }: CommentProps) => {
  const [comment, setComment] = useState<string>("");
  const [commentData,setCommentData] = useState<CommentData[]>([])




  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [post, { isLoading:postLoading }] = usePostCommentMutation();
  const [getComments] = useListCommentMutation()

  const PostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userInfo) {
        return toast.info("sign in to add comment");
      }
      if(!comment){
        return toast.warn('please add comment')
      }
      const trimmedComment = comment.trim();

      if (!trimmedComment) {
        return toast.warn('A comment must contain text');
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
        const commentArray = list.comments
        const reversed = commentArray.slice().reverse()
        setCommentData(reversed)
        commentData
    }
    getCommentList()

  },[campaignid,getComments,commentData])







  return (
    <>
    <div className="mt-10  pb-2 pl-10 text-white ">
      <form onSubmit={PostComment} className="w-full  space-x-5">
        <input
          type="text"
          value={comment}
          className="bg-[#0c0c0c] w-3/4 rounded-sm pl-5 border-b border-[color] focus:border-[color] outline-none  border-t-0 border-l-0 border-r-0"
          placeholder="add a comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-blue-500 w-32 h-10 rounded-md font-semibold text-md"
          type="submit"
        >
          post
        </button>
      </form>
      {postLoading ? <Loader /> : <div></div>}
  
    </div>

    {/*comment list  */}
    <div className=" w-full  p-5 ">
      {commentData.map((data)=>(
        <Suspense key={data._id} fallback={<div>Loading...</div>}>

          <CommentList data={data}/>

        </Suspense>
      ))}
    </div>
    </>

  );
};
