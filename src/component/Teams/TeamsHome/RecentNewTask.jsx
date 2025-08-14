import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button } from "antd";
import { AiFillEye } from "react-icons/ai";

// Assuming the image URLs (this could be an array of images or paths to files)
const userImages = [
  '/mnt/data/5d4e3300-d3b8-4c63-9f21-41b1b9cf1cbb.png', // Your uploaded image
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg'
];

const RecentNewTask = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Function to randomly select an image
  const getRandomImage = () => {
    return userImages[Math.floor(Math.random() * userImages.length)];
  };

  const dataSource = [
    {
      key: "1",
      sl: "01",
      contractorName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "11 Oct 24, 11:10PM",
      image: getRandomImage(),
    },
    {
      key: "2",
      sl: "02",
      contractorName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "12 Oct 24, 02:30PM",
      image: getRandomImage(),
    },
    {
      key: "3",
      sl: "03",
      contractorName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "13 Oct 24, 09:15AM",
      image: getRandomImage(),
    },
    {
      key: "4",
      sl: "04",
      contractorName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "14 Oct 24, 04:45PM",
      image: getRandomImage(),
    },
    {
      key: "5",
      sl: "05",
      contractorName: "Bashar",
      email: "Support.Info@Gmail.Com",
      phoneNumber: "999-888-666",
      timeAndDate: "15 Oct 24, 08:20AM",
      image: getRandomImage(),
    },
  ];

  const showModal = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      width: 60,
    },
    {
      title: "Member Name",
      dataIndex: "contractorName",
      key: "contractorName",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.contractorName}
            className="w-10 h-10 rounded-full mr-2"
          />
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
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
            onClick={() => showModal(record)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg">
            
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
          pagination={false}
          scroll={{ x: 800 }}
          className="shadow-sm"
        />
      </ConfigProvider>

      {/* Modal */}
      <Modal
        open={isModalVisible}
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
              <p className="font-medium text-gray-600">Contractor Name:</p>
              <p className="text-gray-800">{selectedTask?.contractorName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Email:</p>
              <p className="text-gray-800">{selectedTask?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Phone Number:</p>
              <p className="text-gray-800">{selectedTask?.phoneNumber || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Time & Date:</p>
              <p className="text-gray-800">{selectedTask?.timeAndDate || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecentNewTask;
