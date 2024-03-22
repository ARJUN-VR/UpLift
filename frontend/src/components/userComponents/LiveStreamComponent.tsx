
export const LiveStreamComponent = () => {




//   const servers = {
//     iceServers:[
//         {
//             urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
//         }
//     ]
// }


  
  return (
    <div className="bg-gray-900 flex flex-col">
      <div className="w-[50%] ml-20">
        <video autoPlay className="w-full h-screen" />
      </div>
    </div>
  );
};
