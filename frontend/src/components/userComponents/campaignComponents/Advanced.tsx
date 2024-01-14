import React, { useRef, useState } from "react";


export const Advanced = () => {
  const [video,setVideo] = useState<string>('')
  const [image, setImage] = useState<string>("");
  const [story,setStory] = useState<string>('')

  const videoInput = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleVideoInput = () => {
    videoInput?.current?.click();
  };

  const handleImageInput = () => {
    imageInputRef?.current?.click();
  };

  const videoHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const videoFile = e.target?.files?.[0]
    setFileToBase64(videoFile,setVideo)


  }

  const imageHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const imageFile =e.target?.files?.[0]
    setFileToBase64(imageFile,setImage)

  }

  const setFileToBase64 = (file: File | undefined,setInput:React.Dispatch<React.SetStateAction<string>>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setInput(base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  console.log(video)

  return (
    <div className="text-white">
      {/* video */}
      <div className="mt-10 flex flex-col">
        <span className="text-2xl">pitch video</span>
        <span className="text-gray-400 text-sm">
          Add a video or image to appear on the top of your campaign page.
          Campaigns with videos raise 2000% more than campaigns without videos.
          Keep your video 2-3 minutes
        </span>
          </div>
       {video?(
        <>
         <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
             <video style={{width:'100%',height:'100%'}} controls>
              <source src={video} type="video/mp4" />
             </video>
             
         </div>
         </>
        
       ):(
         <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
          <input type="file" accept="video/*" hidden ref={videoInput}onChange={videoHandler}/>
          <label htmlFor="videoInput" onClick={handleVideoInput}>
            {" "}
            Click to Upload video
          </label>
        </div>
    
      )}
      {/* thumbnail */}
      <div className="mt-10 flex flex-col">
        <span className="text-2xl">Video Overlay Image (Optional)</span>
        <span className="text-gray-400 text-sm">
          Choose an image to represent your video before it plays.695 x 460
          recommended resolution.
        </span>
        {image ? (
          <>
            <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
              <img
                src={image}
                alt="campaign image"
                style={{ maxWidth: "100%", height: "100%" }}
              />
            </div>
            <button className=" text-white font-bold w-20 mt-3 ">change</button>
          </>
        ) : (
          <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={imageHandler}
            />
            <label htmlFor="fileInput" onClick={handleImageInput}>
              Click here to upload image
            </label>
          </div>
        )}
      </div>
      {/* story */}
      <div className="mt-10 flex flex-col">
        <span className="text-2xl">story</span>
        <span className="text-gray-400 text-sm">
          Tell potential contributors more about your campaign. Provide details
          that will motivate people to contribute. A good pitch is compelling,
          informative, and easy to digest.
        </span>
        <textarea
          name=""
          id=""
          className="w-[60%] h-32 text-black rounded-md"
        ></textarea>
      </div>
       {/* footer  */}
       <div className="h-52 w-full  flex items-center justify-end">
            <button className="bg-blue-500 w-36 h-12 mr-20" type="submit">
              save&continue
            </button>
          </div>
      {/*add here */}
    </div>
  );
};
