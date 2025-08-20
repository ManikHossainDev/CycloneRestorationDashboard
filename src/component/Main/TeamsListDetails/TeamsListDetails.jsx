import { LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useGetSingleTeamQuery } from "../../../redux/features/teamList/teamList";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import moment from "moment/moment";
import { useBlockUserMutation, useUnblockUserMutation } from "../../../redux/features/block/block";
import Swal from "sweetalert2";

const TeamsListDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleTeamQuery(id);

  const user = data?.attributes;
  console.log(user, "user data from api");

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }
  
  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();


  // Block Handler
  const blockHandler = async (id) => {
    try {
      const res = await block(id);
      console.log(res, "block response");
      if (res?.data?.code === 200) {
        Swal.fire("Success", res.data.message || "User blocked successfully", "success");
        refetch(); // fresh data আনতে
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to block user", "error");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      Swal.fire("Error", "Something went wrong while blocking", "error");
    }
  };

  // Unblock Handler
  const unblockHandler = async (id) => {
    try {
      const res = await unblock(id);
      console.log(res, "unblock response");
      if (res?.data?.code === 200) {
        Swal.fire("Success", res.data.message || "User unblocked successfully", "success");
        refetch();
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to unblock user", "error");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      Swal.fire("Error", "Something went wrong while unblocking", "error");
    }
  };

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
        <h3 className="text-xl font-semibold">{user?.fullName || "N/A"}</h3>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl">
        {[
          { label: "Name", value: user?.fullName },
          { label: "Email", value: user?.email },
          { label: "Date of Birth", value: user?.dateOfBirth ? moment(user.dateOfBirth).format("MMMM Do YYYY") : "N/A" },
          { label: "Phone number", value: user?.phoneNumber },
          { label: "Address", value: user?.address },
          { label: "Role", value: user?.role },
          { label: "Business Name", value: user?.businessName },
          { label: "Calling Code", value: user?.callingCode },
          { label: "Joining date", value: user?.createdAt ? moment(user.createdAt).format("MMMM Do YYYY") : "N/A" },
          { label: "Zones", value: user?.zones },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between border-b border-gray-300 pb-2"
          >
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900">{value || "N/A"}</span>
          </div>
        ))}

        {/* Block / Unblock Buttons */}
        <div className="w-full flex space-x-4 mt-6 justify-end">
          {user?.isBlocked === true ? (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => unblockHandler(id)}
            >
              Unblock
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => blockHandler(id)}
            >
              Block
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsListDetails;
