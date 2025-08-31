import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetUserQuery } from "../../../redux/features/profile/profileApi";

const TeamsProfile = () => {
  const { data } = useGetUserQuery();
  const user = data?.data?.attributes?.user;
  const isFetching = false; // Assuming data is not being fetched

  return (
    <div className="w-full lg:px-5">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center py-1 md:my-2 lg:my-6">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Personal Information</h1>
        </div>
      </div>

      {/* Profile Information */}
      <div className="w-full md:w-[95%] lg:w-[50%] py-5 px-14 rounded-md bg-[#E5F6FD] h-full md:mt-1 mx-auto">
        {/* Profile Picture */}
        <div className="rounded-lg flex justify-center items-center flex-col">
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            <>
              <img
                className="border size-32 rounded-full mx-auto"
                src={`${imageBaseUrl}${user?.profileImage}`}
                alt="Profile"
              />
              <span className=" text-3xl font-semibold text-black mt-2">
                {user?.fullName || 'No name available'}
              </span>
            </>
          )}
        </div>

        {/* Personal Details */}
        <form className="w-full col-span-full md:col-span-9 space-y-6 md:mt-10">
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              defaultValue={user?.fullName}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="email"
              defaultValue={user?.address}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">role</label>
            <input
              type="role"
              defaultValue={user?.role}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">nidNumber</label>
            <input
              type="role"
              defaultValue={user?.nidNumber}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Calling Code</label>
            <input
              type="callingCode"
              defaultValue={user?.callingCode}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Contact no</label>
            <input
              type="text"
              defaultValue={user?.phoneNumber}
              readOnly
              className="w-full rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          
          <div className="flex justify-center">
            <Link to="/teamsProfileEdit">
              <button className="px-8 py-3 bg-[#48B1DB] text-white rounded-lg">
                Edit Profile
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamsProfile;
