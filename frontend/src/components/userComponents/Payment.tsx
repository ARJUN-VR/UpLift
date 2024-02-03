import { RewardCard } from "./RewardCard";

export const Payment = ({ close }) => {
  const closeModal = () => {
    close();
  };
  return (
    <div className="relative w-[50%] bg-gray-800  overflow-y-auto flex items-center flex-col">
      <span className="font-bold mt-10 text-2xl text-white">Back this project</span>
      {/* <button
      onClick={closeModal}
      className="text-red-500 hover:text-red-700 focus:outline-none absolute top-2 right-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button> */}
      <div className="h-20 bg-gray-900 w-full mt-10 flex  items-center mb-5">
        <span className="ml-10 text-white font-bold">make contributions</span>

        {/* contribution */}
        <div className="relative">
          <span className="absolute left-0 flex items-center pl-2 text-gray-100">
            ₹
          </span>
          <input type="number" className="h-5 ml-8 pl-2" />
        </div>
        <button className="bg-green-400 w-40 text-white font-semibold rounded-sm ml-20 h-8">pledge</button>
      </div>

      {/* reward */}
      <div className="flex justify-start w-full  bg-gray-800 ">
        <div className="w-1/2">
        <RewardCard />
        </div>
    <div className="flex items-center bg-gray-800 w-full flex-col text-white px-10">
      <span className="text-xl mt-2 mb-5 font-semibold">Reward</span>
      <p>Rewards inspire support, offering backers exclusive benefits, from early access to unique products. They recognize contributions, creating a sense of partnership. Exciting perks like limited editions or acknowledgments enrich the backer experience, fostering engagement. Your support goes beyond a transaction; it becomes a meaningful collaboration with tangible, valuable returns</p>
      <button className="mt-10 bg-blue-700 w-40 h-10 rounded-md">Claim</button>
    </div>
     </div>

    </div>
  );
};
