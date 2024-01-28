
import { CommentData } from "./CommentBox";

interface DataProp{
    data:CommentData
}

const CommentList = ({ data }: DataProp) => {
    return (
      <div className=" p-4 rounded-md shadow-md mb-2">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-[#1e1e1e] rounded-full mr-3"></div>
          <span className="text-gray-200 font-semibold">{data.userName}</span>
        </div>
        <p className="text-white">{data.comment}</p>
        <div className="flex mt-3">
          <button className="text-gray-400 hover:text-gray-200 mr-3">
            Like
          </button>
          <button className="text-gray-400 hover:text-gray-200">Reply</button>
        </div>
      </div>
    );
  };
  

export default  CommentList
