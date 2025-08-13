import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dataSource = [
    {
      key: "1",
      sl: "01",
      userName: "Bashar",
      email: "SupportInfo@Gmail.Com",
      phone: "999-888-666",
      timeAndDate: "11 Oct 24, 11:10 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
    },
    {
      key: "2",
      sl: "02",
      userName: "Hasan",
      email: "hasan123@Gmail.Com",
      phone: "111-222-333",
      timeAndDate: "12 Oct 24, 12:20 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
    },
    {
      key: "3",
      sl: "03",
      userName: "Karim",
      email: "karimx@Gmail.Com",
      phone: "444-555-666",
      timeAndDate: "13 Oct 24, 03:15 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
    },
    {
      key: "4",
      sl: "04",
      userName: "Rafiq",
      email: "rafiq@Gmail.Com",
      phone: "777-888-999",
      timeAndDate: "14 Oct 24, 06:00 PM",
      userImage: "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
    },
  ];

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img
              src={record.userImage}
              alt={record.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{record.userName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Time & Date",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="bg-[#48B1DB] text-white"
            icon={<AiFillEye size={20} />}
            onClick={() => showModal(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg">
      <h2 className="font-semibold py-3 text-[20px]">Recent New Users</h2>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EEF9FE",
            colorPrimary: "#1890ff",
          },
          components: {
            Table: {
              headerBg: "#48B1DB",
              headerColor: "#000000",
              headerBorderRadius: 2,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x:800 }}
        />
      </ConfigProvider>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black p-2">
          <h1 className="text-center text-xl font-semibold my-2 text-gray-500">
            User Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>User Name :</p>
              <p>{selectedUser?.userName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Email :</p>
              <p>{selectedUser?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Phone :</p>
              <p>{selectedUser?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-400">
              <p>Time & Date :</p>
              <p>{selectedUser?.timeAndDate || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecentTransactions;
