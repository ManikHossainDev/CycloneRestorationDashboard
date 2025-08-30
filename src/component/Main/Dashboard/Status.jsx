import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { useGetTotalAdminStatusQuery } from "../../../redux/features/Status/Status";


const Status = () => {

const {data:allData} = useGetTotalAdminStatusQuery()
const  Status = allData?.data?.attributes;
// console.log(Status)
// console.log(Status?.completeApplication)

const Alldata = [
  { title: "Complete Application", value: Status?.completeApplication },
  { title: "Total Application", value: Status?.totalApplication },
  { title: "Total Contactor", value: Status?.totalContactor},
  { title: "Total Manager", value: Status?.totalManager},
  { title: "Total Member", value: Status?.totalMember},
];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-7">
      {Alldata.map((item, idx) => (
        <div
          key={idx}
          className="w-full flex justify-between items-center p-4 rounded-lg border-2 border-[#48B1DB] bg-[#EEF9FE]"
        >
          <div className="flex items-center">
            <BsFillClipboard2CheckFill className="text-[#48B1DB] size-8 mr-4" />
            <div>
              <h1 className="text-md font-semibold text-[#222222]">
                {item.title}
              </h1>
              <h1 className="text-md font-semibold text-[#222222] text-center">
                {item.value}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Status;
