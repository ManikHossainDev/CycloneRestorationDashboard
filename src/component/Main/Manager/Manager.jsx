import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button, Input } from "antd";
import { AiFillEye } from "react-icons/ai";

const userImages = [
  "/mnt/data/5d4e3300-d3b8-4c63-9f21-41b1b9cf1cbb.png",
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
];

const Manager = () => {
  const [isAddManagerModalVisible, setIsAddManagerModalVisible] =
    useState(false);
  const [isManagerDetailsModalVisible, setIsManagerDetailsModalVisible] =
    useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  // Form data state as an object
  const [formData, setFormData] = useState({
    managerName: "",
    email: "",
    location: "",
    zipCode: "",
  });

  // Function to randomly select an image
  const getRandomImage = () => {
    return userImages[Math.floor(Math.random() * userImages.length)];
  };

  const dataSource = [
    {
      key: "1",
      sl: "01",
      memberName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "11 Oct 24, 11:10PM",
      image: getRandomImage(),
    },
    {
      key: "2",
      sl: "02",
      memberName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "12 Oct 24, 02:30PM",
      image: getRandomImage(),
    },
    {
      key: "3",
      sl: "03",
      memberName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "13 Oct 24, 09:15AM",
      image: getRandomImage(),
    },
    {
      key: "4",
      sl: "04",
      memberName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "14 Oct 24, 04:45PM",
      image: getRandomImage(),
    },
    {
      key: "5",
      sl: "05",
      memberName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "15 Oct 24, 08:20AM",
      image: getRandomImage(),
    },
    {
      key: "6",
      sl: "06",
      memberName: "Ahmed",
      email: "Ahmed.Info@Gmail.Com",
      phoneNumber: "888-777-666",
      timeAndDate: "16 Oct 24, 12:10PM",
      image: getRandomImage(),
    },
    {
      key: "7",
      sl: "07",
      memberName: "Sara",
      email: "Sara.Info@Gmail.Com",
      phoneNumber: "777-666-555",
      timeAndDate: "17 Oct 24, 01:30PM",
      image: getRandomImage(),
    },
    {
      key: "8",
      sl: "08",
      memberName: "Ali",
      email: "Ali.Info@Gmail.Com",
      phoneNumber: "666-555-444",
      timeAndDate: "18 Oct 24, 02:20PM",
      image: getRandomImage(),
    },
    {
      key: "9",
      sl: "09",
      memberName: "Fatima",
      email: "Fatima.Info@Gmail.Com",
      phoneNumber: "555-444-333",
      timeAndDate: "19 Oct 24, 03:10PM",
      image: getRandomImage(),
    },
    {
      key: "10",
      sl: "10",
      memberName: "John",
      email: "John.Info@Gmail.Com",
      phoneNumber: "444-333-222",
      timeAndDate: "20 Oct 24, 04:00PM",
      image: getRandomImage(),
    },
    {
      key: "11",
      sl: "11",
      memberName: "Lucy",
      email: "Lucy.Info@Gmail.Com",
      phoneNumber: "333-222-111",
      timeAndDate: "21 Oct 24, 05:50PM",
      image: getRandomImage(),
    },
    {
      key: "12",
      sl: "12",
      memberName: "David",
      email: "David.Info@Gmail.Com",
      phoneNumber: "222-111-000",
      timeAndDate: "22 Oct 24, 06:40PM",
      image: getRandomImage(),
    },
  ];

  const showManagerDetailsModal = (manager) => {
    setSelectedManager(manager);
    setIsManagerDetailsModalVisible(true);
  };

  const showAddManagerModal = () => {
    setIsAddManagerModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddManagerModalVisible(false);
    setIsManagerDetailsModalVisible(false);
    setFormData({
      managerName: "",
      email: "",
      location: "",
      zipCode: "",
    });
  };

  // Handle the form submission
  const handleAddManagerSubmit = () => {
    const newManager = {
      ...formData,
      image: getRandomImage(), // Attach a random image for the new manager
    };
    console.log("New Manager Added:", newManager);
    // Close the modal after submission
    handleCancel();
  };

  const columns = [
    { title: "#SL", dataIndex: "sl", key: "sl", width: 60 },
    {
      title: "Member",
      dataIndex: "memberName",
      key: "memberName",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.memberName}
            className="w-10 h-10 rounded-full mr-2"
          />
          {text}
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Time & Date",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
      width: 140,
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="bg-[#48B1DB] text-white hover:bg-[#3a9bc1]"
            icon={<AiFillEye size={16} />}
            onClick={() => showManagerDetailsModal(record)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mb-4">Manager List</h2>
        <button
          className="bg-[#48B1DB] text-white px-4 py-2 rounded"
          onClick={showAddManagerModal}
        >
          Add Manager
        </button>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EEF9FE",
            colorPrimary: "#48B1DB",
            borderRadius: 8,
          },
          components: {
            Table: {
              headerBg: "#48B1DB",
              headerColor: "#ffffff",
              headerBorderRadius: 8,
              rowHoverBg: "#f0f8ff",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }} // Pagination with 10 items per page
          scroll={{ x: 800 }}
        />
      </ConfigProvider>

      {/* Modal for Adding Manager */}
      <Modal
        open={isAddManagerModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={500}
        className="rounded-lg"
      >
        <div className="text-black p-2">
          <h1 className=" text-xl font-semibold my-4 text-gray-700">
            Add Manager
          </h1>
          <div className="">
            <div className="py-2">
              <p className="font-medium text-gray-600">Manager Name:</p>
              <Input
                size="large"
                name="managerName"
                value={formData.managerName}
                onChange={handleInputChange}
                placeholder="Enter manager name"
              />
            </div>
            <div className="py-2">
              <p className="font-medium text-gray-600">Email:</p>
              <Input
                size="large"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>
            <div className="py-2">
              <p className="font-medium text-gray-600">Location:</p>
              <Input
                size="large"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
              />
            </div>
            <div className="py-2">
              <p className="font-medium text-gray-600">Zip Code:</p>
              <Input
                size="large"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Enter zip code"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <Button
              size="large"
              className="bg-[#48B1DB] text-white w-full"
              onClick={handleAddManagerSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for Manager Details */}
      <Modal
        open={isManagerDetailsModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={500}
        className="rounded-lg"
      >
        <div className="text-black p-2">
          <h1 className="text-center text-xl font-semibold my-4 text-gray-700">
            Member Details
          </h1>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Member Name:</p>
              <p className="text-gray-800">
                {selectedManager?.memberName || "N/A"}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Email:</p>
              <p className="text-gray-800">{selectedManager?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Phone Number:</p>
              <p className="text-gray-800">
                {selectedManager?.phoneNumber || "N/A"}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Time & Date:</p>
              <p className="text-gray-800">
                {selectedManager?.timeAndDate || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Manager;
