import ManagerPChat from "./ManagerPChat";
import ManagerStatus from "./ManagerStatus";
import RecentNewContractor from "./RecentNewContractor";
import RecentNewMember from "./RecentNewMember";

const ManagerDashboard = () => {
 return (
 <div>
       <h1 className="text-lg font-semibold mb-2">Manager Dashboard</h1>
       <ManagerStatus />
        
         <div className="w-full h-full md:h-[60vh]  flex flex-col gap-4 lg:flex-row justify-between items-center">
        {/* Left Column: Chart */}
        <div className="w-full lg:w-[74%] rounded-md ">
        
          <h2 className="font-semibold py-3 text-[18px]  text-gray-800 ">Recent New Member</h2>
          <RecentNewMember />
        </div>
        
        {/* Right Column: Pie Chart */}
        <div className="w-full lg:w-[24%] md:mt-[53px]">
          
          <ManagerPChat />
        </div>
      </div>
     
        <h2 className="font-semibold py-3 text-[18px] text-gray-800  ">Recent New Contractor</h2>
       <RecentNewContractor />
    </div>
 );
};

export default ManagerDashboard;