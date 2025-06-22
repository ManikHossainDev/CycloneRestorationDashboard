import { BsFillClipboard2CheckFill } from "react-icons/bs";

const data = {
  totalUser: 1200,
  recentUserData: [
    { userId: 1, name: "John" },
    { userId: 2, name: "Alice" },
    { userId: 3, name: "Bob" },
    { userId: 4, name: "Eve" },
  ],
};

const Alldata = [
  { title: "Total User", value: data.totalUser },
  { title: "Complete Restoration", value: data.totalUser },
  { title: "Total Teams", value: data.totalUser },
  { title: "Complete Restoration", value: data.totalUser },
  { title: "Granted Balance", value: data.totalUser },
];

const Status = () => {
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
