import IncomeRatioGraph from "./IncomeRatioGraph";
import RecentCompleteTask from "./RecentCompleteTask";
import RecentNewTask from "./RecentNewTask";
import TeamsPChat from "./TeamsPChat";
import TeamsStatus from "./TeamsStatus";

const TeamsHome = () => {
  return (
    <div>
       <h1 className="text-lg font-semibold">Contractor Dashboard</h1>
       <TeamsStatus />
        <br />
         <div className="w-full h-full md:h-[60vh]  flex flex-col gap-4 md:flex-row justify-between items-center">
        {/* Left Column: Chart */}
        <div className="w-full lg:w-[74%]  rounded-md">
           <h2 className="font-semibold  text-[18px]  text-gray-800 ">Recent New Task</h2>
          <RecentNewTask />
        </div>
        
        {/* Right Column: Pie Chart */}
        <div className="w-full lg:w-[24%] mt-6">
          <TeamsPChat />
        </div>
      </div>
       <RecentCompleteTask />
    </div>
  );
};

export default TeamsHome;