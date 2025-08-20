import { LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useGetSingleTeamQuery } from "../../../redux/features/teamList/teamList";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import moment from "moment/moment";

const TeamsListDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleTeamQuery(id);

  const user = data?.attributes;
  console.log(user, "user data from api");

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/Teamslist" className="text-gray-500 hover:text-gray-800">
          <LeftOutlined style={{ fontSize: 20 }} />
        </Link>
        <h2 className="text-2xl font-semibold">Contractor Details</h2>
      </div>

      {/* Profile */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img
            src={user?.profileImage ? `${imageBaseUrl}${user.profileImage}` : "/default-avatar.png"}
            alt={user?.fullName || "No Name"}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">{user.fullName}</h3>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl">
        {[
          { label: "Name", value: user.fullName },
          { label: "Email", value: user.email },
          { label: "Date of Birth", value: moment(user.dateOfBirth).format("MMMM Do YYYY") },
          { label: "Phone number", value: user.phoneNumber },
          { label: "Address", value: user.address },
          { label: "Role", value: user.role },
          { label: "Business Name", value: user.businessName },
          { label: "Calling Code", value: user.callingCode },
          { label: "Joining date", value: moment(user.createdAt).format("MMMM Do YYYY") },
          { label: "Zones", value: user.zones },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between border-b border-gray-300 pb-2"
          >
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900">{value || "N/A"}</span>
          </div>
        ))}
       <div className="w-full  flex space-x-4 mt-6 justify-end">
        <button className="bg-red-500 text-white px-4 py-2 rounded">Block</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Unblock</button>
      </div>
      </div>
      {/*block and unblocking button need */}
      
    </div>
  );
};

export default TeamsListDetails;
