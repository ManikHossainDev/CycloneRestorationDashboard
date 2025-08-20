import { LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../../redux/features/user/userApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import moment from "moment/moment";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../../redux/features/block/block";
import Swal from "sweetalert2";

const UserDetails = () => {
  const { id } = useParams();

  // ✅ All hooks at the top
  const { data, isLoading, error, refetch } = useGetSingleUserQuery(id);
  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();

  const user = data?.attributes;

  // ✅ Conditional UI after hooks
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  // Block Handler
  const blockHandler = async (id) => {
    try {
      const res = await block(id);
      if (res?.data?.code === 200) {
        Swal.fire("Success", res.data.message || "User blocked successfully", "success");
        refetch();
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to block user", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while blocking", "error");
    }
  };

  // Unblock Handler
  const unblockHandler = async (id) => {
    try {
      const res = await unblock(id);
      if (res?.data?.code === 200) {
        Swal.fire("Success", res.data.message || "User unblocked successfully", "success");
        refetch();
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to unblock user", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while unblocking", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/users" className="text-gray-500 hover:text-gray-800">
          <LeftOutlined style={{ fontSize: 20 }} />
        </Link>
        <h2 className="text-2xl font-semibold">User Details</h2>
      </div>

      {/* Profile */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img
            src={
              user?.profileImage
                ? `${imageBaseUrl}${user.profileImage}`
                : `${imageBaseUrl}/uploads/users/default.png`
            }
            alt={user?.fullName || "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">{user?.fullName}</h3>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl mb-10">
        {[
          { label: "Name", value: user?.fullName },
          { label: "Email", value: user?.email },
          {
            label: "Date of Birth",
            value: user?.dateOfBirth
              ? moment(user?.dateOfBirth).format("DD MMM YYYY")
              : "N/A",
          },
          { label: "Phone number", value: user?.phoneNumber || "N/A" },
          { label: "Joining date", value: user?.createdAt?.split("T")[0] },
          { label: "Role", value: user?.role },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between border-b border-gray-300 pb-2">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}

        {/* Actions */}
        <div className="w-full flex space-x-4 mt-6 justify-end">
          {user?.isBlocked ? (
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

export default UserDetails;
