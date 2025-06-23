import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button } from "antd";
import { AiFillEye } from "react-icons/ai";

const RecentCompleteTask = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const dataSource = [
    {
      key: "1",
      sl: "01",
      taskName: "Hope After Storm",
      category: "Cyclone Restoration",
      price: "$200",
      location: "New York",
      timeAndDate: "11 Oct 24, 11:10PM",
    },
    {
      key: "2",
      sl: "02",
      taskName: "Emergency Cleanup",
      category: "Disaster Recovery",
      price: "$350",
      location: "California",
      timeAndDate: "12 Oct 24, 02:30PM",
    },
    {
      key: "3",
      sl: "03",
      taskName: "Roof Repair Service",
      category: "Storm Damage",
      price: "$450",
      location: "Texas",
      timeAndDate: "13 Oct 24, 09:15AM",
    },
    {
      key: "4",
      sl: "04",
      taskName: "Flood Restoration",
      category: "Water Damage",
      price: "$600",
      location: "Florida",
      timeAndDate: "14 Oct 24, 04:45PM",
    },
    {
      key: "5",
      sl: "05",
      taskName: "Tree Removal",
      category: "Storm Cleanup",
      price: "$280",
      location: "Georgia",
      timeAndDate: "15 Oct 24, 08:20AM",
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
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 140,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 80,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 120,
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
      <h2 className="font-semibold py-3 text-[18px] text-gray-800">Recent Complete Task</h2>
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
            Task Details
          </h1>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Task Name:</p>
              <p className="text-gray-800">{selectedTask?.taskName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Category:</p>
              <p className="text-gray-800">{selectedTask?.category || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Price:</p>
              <p className="text-gray-800 font-semibold">{selectedTask?.price || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Location:</p>
              <p className="text-gray-800">{selectedTask?.location || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="font-medium text-gray-600">Time & Date:</p>
              <p className="text-gray-800">{selectedTask?.timeAndDate || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecentCompleteTask;