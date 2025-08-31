/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { useGetUserQuery } from "../../../redux/features/profile/profileApi";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {data} = useGetUserQuery()
  const Image = data?.data?.attributes?.user?.profileImage;

  return (
    <div className=" w-full md:h-[80px] px-3 py-2  flex justify-between items-center  text-white sticky top-0 left-0 z-[9999] bg-[#48B1DB]">
      <div className="flex items-center gap-3 py-1 px-3 md:w-8/12 rounded">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
      </div>

     <div className="flex space-x-3">
       <div className="flex justify-between items-center gap-2 pl-2 ">
        <div
          onClick={() => {
            if (user?.role === "admin") {
              navigate("/notification");
            } else if (user?.role === "member") {
              navigate("/TeamsNotification");
            } else if (user?.role === "manager") {
              navigate("/ManagerNotification");
            }
          }}
          className="mr-4 bg-white rounded-full p-3 cursor-pointer"
        >
          <IoNotificationsCircleOutline className="text-[#48B1DB]" size={24} />
        </div>
      </div>

      <img
        onClick={() => {
          if (user?.role === "admin") {
            navigate("/personal-info");
          } else if (user?.role === "contactor") {
            navigate("/TeamsProfile");
          } else if (user?.role === "manager") {
            navigate("/ManagerProfile");
          }
        }}
        src={
          user?.profileImage
            ? `${imageBaseUrl}${Image}`
            : "/src/assets/user.png"
        }
        className="size-12 rounded-full cursor-pointer"
      />
      {/* Right Side */}
      <div className="text-white">
        <div className="mr-2 sm:text-sm md:text-md">{user?.fullName}</div>
        <div className="text-sm">{user?.role}</div>
      </div>
     </div>
    </div>
  );
};

export default Header;
