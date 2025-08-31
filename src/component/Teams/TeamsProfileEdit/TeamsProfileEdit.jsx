import { useEffect, useState, useRef } from "react";
import { IoChevronBack, IoCameraOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";

const TeamsProfileEdit = () => {
  const { data } = useGetUserQuery();
  const user = data?.data?.attributes?.user;
  const navigate = useNavigate();
  const [updateProfileInfo, { isLoading }] = useUpdateUserMutation();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Show existing profile image on load
  useEffect(() => {
    if (user?.profileImage) {
      setPreviewImage(`${imageBaseUrl}${user.profileImage}`);
    }
  }, [user]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, and PNG files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        return;
      }

      setSelectedImage(file); // save selected file
      setPreviewImage(URL.createObjectURL(file)); // show preview
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const callingCode = form.callingCode.value;
    const phoneNumber = form.phoneNumber.value;
    const nidNumber = form.nidNumber.value;
    const dateOfBirth = form.dateOfBirth.value;
    const address = form.address.value;

    const formdata = new FormData();
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("callingCode", callingCode);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("nidNumber", nidNumber);
    formdata.append("dateOfBirth", dateOfBirth);
    formdata.append("address", address);
    // ✅ Correct way: append image only if selected
    if (selectedImage) {
      formdata.append("profileImage", selectedImage);
    }

    try {
      const response = await updateProfileInfo(formdata).unwrap();
      console.log(response, "responsdata");
      if (response.attributes) {
        toast.success("Profile updated successfully!");
        navigate("/TeamsProfile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating your profile.");
    }
  };

  return (
    <div className="w-full">
      {/* Back Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center my-6">
          <Link to="/TeamsProfile">
            <IoChevronBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Information</h1>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[95%] lg:w-[50%] p-7 px-14 rounded-md bg-[#E5F6FD] mx-auto mb-5"
      >
        {/* Profile Image */}
        <div className="flex justify-center">
          <div
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer"
          >
            {previewImage ? (
              <img
                className="border rounded-full w-[130px] h-[130px] object-cover"
                src={previewImage}
                alt="Profile Preview"
              />
            ) : (
              <div className="border rounded-full w-[130px] h-[130px] flex justify-center items-center bg-gray-300">
                <IoCameraOutline size={40} className="text-white" />
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {/* Inputs */}
        <div className="mt-5">
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            defaultValue={user?.firstName || ""}
            placeholder="Enter your first name"
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mt-5">
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            defaultValue={user?.lastName || ""}
            placeholder="Enter your last name"
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mt-5">
          <label className="block font-medium">Calling Code</label>
          <input
            type="text"
            name="callingCode"
            defaultValue={user?.callingCode || ""}
            placeholder="Enter your calling code"
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mt-5">
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={user?.phoneNumber || ""}
            placeholder="Enter your phone number"
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mt-5">
          <label className="block font-medium">NID Number</label>
          <input
            type="text"
            name="nidNumber"
            defaultValue={user?.nidNumber || ""}
            placeholder="Enter your NID number"
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mt-5">
          <label className="block font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={user?.dateOfBirth || ""}
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <div className="mt-5">
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            defaultValue={user?.address || ""}
            placeholder="Enter your address"
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-5 py-3 rounded"
          >
            {isLoading ? "Updating..." : "Update Information"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamsProfileEdit;
