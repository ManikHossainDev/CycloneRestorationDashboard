import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button } from "antd";
import { AiFillEye } from "react-icons/ai";
import { useManagerStatusQuery } from "../../../redux/features/Status/Status";
import moment from "moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const RecentNewMember = () => {
  const { data: ManagerStatus } = useManagerStatusQuery();
  const managerData = ManagerStatus?.data?.attributes?.recentMemberData || [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Transform API data for Table
  const dataSource = managerData.map((item, index) => ({
    key: item._id,
    sl: (index + 1).toString().padStart(2, "0"),
    contractorName: item.fullName,
    email: item.email,
    phoneNumber: `${item.callingCode} ${item.phoneNumber}`,
    timeAndDate: moment(item.createdAt).format("DD MMM YY, hh:mm A"), // 👈 moment used here
    image: item.profileImage ? `${imageBaseUrl}${item.profileImage}` : '',
  }));

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
    },
    {
      title: "Member Name",
      dataIndex: "contractorName",
      key: "contractorName",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.contractorName}
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
          {text}
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
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
          scroll={{ x: 900 }}
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
              <p className="font-medium text-gray-600">Member Name:</p>
              <p className="text-gray-800">
                {selectedTask?.contractorName || "N/A"}
              </p>
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

export default RecentNewMember;
