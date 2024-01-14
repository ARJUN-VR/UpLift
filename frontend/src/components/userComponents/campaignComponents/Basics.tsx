import { useRef, useState } from "react";
import { Input } from "./Input";

export const Basics = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>('');
  const [location, setLocation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(name, "this is name");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
    <div className="text-white">
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
              setInput={setName}
              value={name}
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
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
              <option value="Art">Art</option>
              <option value="Game">Game</option>

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
