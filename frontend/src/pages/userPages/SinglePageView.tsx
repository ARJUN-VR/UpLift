
import { Header } from "../../components/userComponents/Header";
import { SideBar } from "../../components/userComponents/SideBar";
import { CampiagnMenu } from "../../components/userComponents/campaignComponents/CampiagnMenu";

export const SinglePageView = () => {
  return (
    <div className="bg-[#0c0c0c] flex flex-col min-h-screen">
      <Header handleSearchQuery={()=>{}} />
      <div className="flex">
        <div className="sticky">
          <SideBar />
        </div>
        <div className="w-full">
          <CampiagnMenu />
        </div>
      </div>
    </div>
  );
};

