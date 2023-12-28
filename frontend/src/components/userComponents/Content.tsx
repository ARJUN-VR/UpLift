import { ExploreCard } from "./ExploreCard";
import { PriceBar } from "./PriceBar";

export const Content = () => {
  return (
    <div className="bg-gray-800">
      {/* <!-- Main --> */}
      <div className="max-w-full h-full flex relative overflow-y-hidden mr-7 flex-col bg-gray-800">
        <div className="">
          <PriceBar />
        </div>

       <div className="mt-2">
       <ExploreCard />
       </div>

       {/* campaign lists */}
       <div className="w-full h-[1000px] flex bg-gray-800 mt-10">

       </div>

      </div>
    </div>
  );
};
