import { useState } from "react";
import { Input } from "./Input";

export const Basics = () => {
    

    const [name,setName] = useState<string>('')
    const [category,setCategory] = useState<string>('')
    const [image,setImage] = useState<string>('')
    const [location,setLocation] = useState<string>('')
    const [duration,setDuration] = useState<string>('')

console.log(name,'this is name')

const submitHandler=(e:React.FormEvent)=>{
    e.preventDefault()
    
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
        <form  onSubmit={submitHandler}>
          {/* Title */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaign title</span>
            <span className="text-gray-400 text-sm">
              What is the title of your campaign?
            </span>
            <Input placeHolder="campaign title" type="text" setInput={setName} value={name} />
          </div>
          {/* Category */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaign category</span>
            <span className="text-gray-400 text-sm">
              To help backers find your campaign, select a category that best
              represents your project.
            </span>
            <select
        className="w-80 h-7 rounded-md mt-2"
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
            <div className="w-80 h-48 bg-gray-300 flex justify-center items-center rounded-lg mt-7">
              <a href="">Upload Image</a>
            </div>
          </div>
          {/* location */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">Location</span>
            <span className="text-gray-400 text-sm">
            Choose the location where you are running the campaign. This location will be visible on your campaign page for your audience to see.
            </span>
            <Input placeHolder="  location" type="string" setInput={setLocation} value={location} />
          </div>
          {/* Duration */}
          <div className="mt-10 flex flex-col">
            <span className="text-2xl">campaig duration</span>
            <span className="text-gray-400 text-sm whitespace-normal max-w-[70%] ">
            How many days will you be running your campaign for? You can run a campaign for any number of days, with a 60 day duration maximum. Keep in mind that you will be able to extend as many times as you want up until the 60 day duration maximum!
            </span>
            <Input placeHolder="  campaign duration" type="string" setInput={setDuration} value={duration} />
          </div>
          {/* footer  */}
          <div className="h-52 w-full  flex items-center justify-end">
<button className="bg-blue-500 w-36 h-12 mr-20" type="submit">save&continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};
