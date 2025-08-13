import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { FaCrown } from "react-icons/fa6";

const RepairRequestsDetails = () => {
  const [selectedContractor, setSelectedContractor] = useState(null);

  const data = {
    restorationTitle: "Hope After Storm",
    restorationCategory: "Cyclone",
    damageSeverityLevel: "Critical",
    time: "Oct 24, 11:00 PM",
    location: "New York, USA",
    productDetails:
      "I've been affected by the storm and need help to recover. From shelter to supplies, I'm seeking support to rebuild my life.",
    insuranceProviderName: "Reliance General",
    policyNumber: "HOMECARE-003XY",
    contactPersons: [
      {
        id: 1,
        name: "Hisham Islam",
        location: "New York, US",
        phone: "(985) 796-6674",
        avatar: "https://i.ibb.co/bjqrb68n/Ellipse-260.png",
      },
      {
        id: 2,
        name: "Manik Hossain",
        location: "New York, US",
        phone: "(985) 796-6674",
        avatar: "https://i.ibb.co/bjqrb68n/Ellipse-260.png",
      },
    ],
    damageImage: "https://i.ibb.co/8nGkcY68/image-6.png",
  };

  const handleAssign = (contractorId) => {
    setSelectedContractor(contractorId);
  };

  const handleConfirm = () => {
    alert("Assignment confirmed!");
  };

  return (
    <div className="md:px-4 py-6">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 w-full space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg md:p-4 ">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 px-2">
                <div>
                  <p className="text-md font-bold text-gray-600">
                    Restoration Title
                  </p>
                  <p className="text-gray-900 font-medium">
                    {data.restorationTitle}
                  </p>
                </div>
                <div>
                  <p className="text-md font-bold text-gray-600">
                    Restoration Category
                  </p>
                  <p className="text-gray-900 font-medium">
                    {data.restorationCategory}
                  </p>
                </div>
                <div>
                  <p className="text-md font-bold text-gray-600">
                    Damage Severity Level
                  </p>
                  <p className="text-red-600 font-medium">
                    {data.damageSeverityLevel}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-2">
                <div>
                  <p className="text-md font-bold text-gray-600">Time</p>
                  <p className="text-gray-900">{data.time}</p>
                </div>
                <div>
                  <p className="text-md font-bold text-gray-600">Location</p>
                  <p className="text-gray-900">{data.location}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border-b-2">
              <h2 className="text-lg font-semibold mb-3">Product Details</h2>
              <p className="text-gray-700">{data.productDetails}</p>
            </div>

            {/* Insurance Info */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border-b-2">
              <h2 className="text-lg font-semibold mb-3">
                House Insurance Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Provider</p>
                  <p className="text-gray-900">{data.insuranceProviderName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Policy #</p>
                  <p className="text-gray-900">{data.policyNumber}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-4 sm:p-6 ">
              <h2 className="text-lg font-semibold mb-3">Contact Person</h2>

              {data.contactPersons.map((person, index) => (
                <div key={person.id} className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex space-x-1 md:space-x-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {person.name}
                          </p>
                          <p className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {person.location}
                          </p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <p className="font-medium text-gray-900">Phone</p>
                          <p>{person.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < data.contactPersons.length - 1 && (
                    <hr className="mt-4 border-gray-200" />
                  )}
                </div>
              ))}

              <div className=" mt-6 gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAssign(1)}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Assign
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100">
                    Decline
                  </button>
                </div>
              </div>
              
              <div className="max-w-sm  rounded-lg overflow-hidden shadow bg-white p-6 mt-6 border-2 border-[#50C5F3]">
                <div className="flex items-center space-x-2">
                  <FaCrown className="text-blue-500 text-3xl" />
                  <h2 className="text-xl font-semibold">Premium member</h2>
                </div>
                <div className="mt-2 border-b border-[#C9EDFB]" />

                <ul className="mt-4 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>All Basic features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>Pre-storm checkup</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>Emergency hotline</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>Priority post-storm damage assessment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>Access pre-storm services</span>
                  </li>
                </ul>

                <div className="mt-4 text-lg font-bold">
                  <span className="text-xl">$40/month</span> or
                  <span className="text-xl text-gray-500"> $450/year</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white px-10 py-3 text-lg rounded hover:bg-blue-600 transition mt-2 "
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 w-full space-y-6">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src="https://i.ibb.co/Mk39pdJT/image-5.png"
                alt="Additional damage"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={data.damageImage}
                alt="Storm damage"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairRequestsDetails;
