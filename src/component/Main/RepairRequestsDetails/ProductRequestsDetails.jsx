import { MapPin } from "lucide-react";
import { FaCrown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useState } from "react";
import {
  useGetContactorQuery,
  useSingleRestorationApplicationQuery,
} from "../../../redux/features/RestorationApplication/RestorationApplication";

const ProductRequestsDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoneData, setZoneData] = useState(null);
  const [selectedContactor, setSelectedContactor] = useState(null);
  console.log(selectedContactor);
  const { data: zoneAllData } = useGetContactorQuery(zoneData);
  const contactor = zoneAllData?.data?.attributes?.results;
  const { data, isLoading } = useSingleRestorationApplicationQuery(id);

  if (isLoading) return <div>Loading...</div>;

  const AllDatas = data?.data?.attributes;
  const Features = AllDatas?.member?.subscription?.subscriptionId?.features;
  const subscriptionAmount = AllDatas?.member?.subscription?.subscriptionId;

  const handleAssign = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const AssignConfirm = () => {
    alert("Assignment confirmed!");
  };

  return (
    <div className="md:px-4 py-6">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 w-full space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg md:p-4">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 px-2">
                <div>
                  <p className="text-md font-bold text-gray-600">
                    Restoration Title
                  </p>
                  <p className="text-gray-900 font-medium">
                    {AllDatas?.reportTitle}
                  </p>
                </div>
                <div>
                  <p className="text-md font-bold text-gray-600">
                    Restoration Category
                  </p>
                  <p className="text-gray-900 font-medium">
                    {AllDatas?.restorationCategory || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-md font-bold text-gray-600">
                    Damage Severity Level
                  </p>
                  <p className="text-red-600 font-medium">
                    {AllDatas?.damageLavel}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-2">
                <div>
                  <p className="text-md font-bold text-gray-600">Time</p>
                  <p className="text-gray-900">
                    {AllDatas?.damageDate
                      ? new Date(AllDatas?.damageDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-md font-bold text-gray-600">Location</p>
                  <p className="text-gray-900">{AllDatas?.location}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border-b-2">
              <h2 className="text-lg font-semibold mb-3">Product Details</h2>
              <p className="text-gray-700">
                {AllDatas?.description || "No description available."}
              </p>
            </div>

            {/* Insurance Info */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border-b-2">
              <h2 className="text-lg font-semibold mb-3">
                House Insurance Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black">Provider Name</p>
                  <p className="text-gray-900">
                    {AllDatas?.insuranceInformation?.providerName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-black">Policy Number</p>
                  <p className="text-gray-900">
                    {AllDatas?.insuranceInformation?.policyNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-3">Contact Person</h2>

              {AllDatas?.contactPersonName ? (
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={
                          AllDatas?.member?.profileImage
                            ? `${imageBaseUrl}${AllDatas?.member?.profileImage}`
                            : ""
                        }
                        alt={AllDatas?.contactPersonName}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex space-x-1 md:space-x-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {AllDatas?.contactPersonName}
                          </p>
                          <p className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {AllDatas?.location}
                          </p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <p className="font-medium text-gray-900">Phone</p>
                          <p>{AllDatas?.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No contact person available.</p>
              )}

              <div className=" mt-6 gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAssign}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Assign
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100">
                    Decline
                  </button>
                </div>
              </div>

              {/* Premium Member Info */}
              <div className="max-w-sm rounded-lg overflow-hidden shadow bg-white p-6 mt-6 border-2 border-[#50C5F3]">
                <div className="flex items-center space-x-2">
                  <FaCrown className="text-blue-500 text-3xl" />
                  <h2 className="text-xl font-semibold">Premium member</h2>
                </div>
                <div className="mt-2 border-b border-[#C9EDFB]" />
                <ul className="mt-4 space-y-2">
                  {Features.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>

                <div className="mt-4 text-lg font-bold">
                  <span className="text-xl">${subscriptionAmount?.amount}</span>{" "}
                  {subscriptionAmount?.type}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 w-full space-y-6">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={
                  AllDatas?.damageImage[0]
                    ? `${imageBaseUrl}${AllDatas?.damageImage[0]}`
                    : ""
                }
                alt="Additional damage"
                className="w-full h-[30vh] object-cover"
              />
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={
                  AllDatas?.insuranceInformation?.insuranceImage
                    ? `${imageBaseUrl}${AllDatas?.insuranceInformation?.insuranceImage}`
                    : ""
                }
                alt="Storm damage"
                className="w-full h-[30vh] lg:h-[60vh] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Zone Mapping */}
      {isModalOpen && (
        <div className=" fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg max-w-lg w-full space-y-4">
            <h3 className="text-lg font-semibold">Select Zones</h3>
            <div className="flex flex-wrap space-x-2 ">
              {AllDatas?.zone?.map((zone, index) => (
                <button
                  onClick={() => setZoneData(zone)}
                  key={index}
                  className={`p-2 mb-2 rounded-md ${
                    zone === zoneData
                      ? "bg-[#78d0f8] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  Zone {zone}
                </button>
              ))}
            </div>

            {contactor ? (
              <h3 className="text-lg font-semibold">Select contactor</h3>
            ) : null}
            {contactor?.map((user) => (
              <button
                onClick={() => setSelectedContactor(user.id)}
                key={user.id}
                className={`p-2 mb-2 rounded-md ${
                  selectedContactor === user.id
                    ? "bg-[#78d0f8] text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {user.fullName}
              </button>
            ))}

            <div className="mt-4 flex justify-end">
              <div className="flex space-x-2">
                <button onClick={AssignConfirm} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Assign Confirm
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRequestsDetails;
