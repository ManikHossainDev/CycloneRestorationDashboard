import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { useManagerStatusQuery } from "../../../redux/features/Status/Status";

const ManagerStatus = () => {

 const  {data:ManagerStatus} = useManagerStatusQuery()
 const managerData = ManagerStatus?.data?.attributes;
 console.log("manager Status data show ", managerData);

  const Alldata = [
  { title: "Total Member", value: managerData?.totalMember },
  { title: "Total Contractor", value: managerData?.totalContactor },
  { title: "Complete Application", value: managerData?.completeApplication },
];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
      {Alldata.map((item, idx) => (
        <div
          key={idx}
          className="w-full flex justify-between items-center p-4 rounded-lg border-2 border-[#48B1DB] bg-[#EEF9FE]"
        >
          <div>
            <BsFillClipboard2CheckFill className="text-[#48B1DB] size-8 mr-4" />
          </div>
          <div>
            <h1 className="text-md font-semibold text-[#222222]">
              {item.title}
            </h1>
            <h1 className="text-md font-semibold text-[#222222] text-center">
              {item.value}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagerStatus;
