import IncomeRatioGraph from "./IncomeRatioGraph";
import RecentCompleteTask from "./RecentCompleteTask";
import TeamsPChat from "./TeamsPChat";
import TeamsStatus from "./TeamsStatus";

const TeamsHome = () => {
  return (
    <div>
       <h1 className="text-lg font-semibold">Teams Dashboard</h1>
       <TeamsStatus />
        <br />
         <div className="w-full h-full md:h-[60vh]  flex flex-col gap-4 md:flex-row justify-between items-center">
        {/* Left Column: Chart */}
        <div className="w-full lg:w-[74%] bg-[#EEF9FE] rounded-md p-5">
          <IncomeRatioGraph />
        </div>
        
        {/* Right Column: Pie Chart */}
        <div className="w-full lg:w-[24%]">
          <TeamsPChat />
        </div>
      </div>
       <RecentCompleteTask />
    </div>
  );
};

export default TeamsHome;