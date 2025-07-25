import { Button, } from "antd";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../../redux/features/user/userApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const UserDetails = () => {
  const {id} = useParams()
  console.log(id) 
  const {data} = useGetSingleUserQuery(id)
  console.log(data)
  const user = data?.attributes
  console.log(user?.profilePictureUrl)
 
  return (
    <div className="">
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
            src={ user.profilePictureUrl ? `${imageBaseUrl}/${user.profilePictureUrl}` : ""}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">{user.name}</h3>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl mb-10">
        {[
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "Date of Birth", value: user.dob},
          { label: "Phone number", value: user.phone},
          { label: "Joining date", value: user.joiningDate},
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between border-b border-gray-300 pb-2"
          >
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default UserDetails;
