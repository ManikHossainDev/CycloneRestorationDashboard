import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button, Tag } from "antd";
import { AiFillEye } from "react-icons/ai";
import { ArrowLeft } from "lucide-react";

const TeamsEarnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEarning, setSelectedEarning] = useState(null);

  const dataSource = [
    {
      key: "1",
      sl: "01",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Pending",
    },
    {
      key: "2",
      sl: "02",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
    {
      key: "3",
      sl: "03",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Decline",
    },
    {
      key: "4",
      sl: "04",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
    {
      key: "5",
      sl: "05",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
    {
      key: "6",
      sl: "06",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
    {
      key: "7",
      sl: "07",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
    {
      key: "8",
      sl: "08",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
    {
      key: "9",
      sl: "09",
      teamName: "Fix Force",
      transactionId: "1394",
      amount: "$100",
      status: "Success",
    },
  ];

  const showModal = (earning) => {
    setSelectedEarning(earning);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEarning(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "#52C41A"; // Green
      case "Decline":
        return "#FF4D4F"; // Red
      case "Pending":
        return "#1890FF"; // Blue
      default:
        return "#1890FF";
    }
  };

  const getStatusTextColor = (status) => {
    return "#ffffff"; // White text for all status tags
  };

  const columns = [
    {
      title: "#Sl",
      dataIndex: "sl",
      key: "sl",
      width: 60,
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
      width: 150,
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 140,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (amount) => (
        <span className="font-semibold text-gray-800">{amount}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          style={{
            borderRadius: "12px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: "500",
            color: getStatusTextColor(status),
            border: "none",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="bg-[#48B1DB] text-white hover:bg-[#3a9bc1] border-none"
            icon={<AiFillEye size={16} />}
            onClick={() => showModal(record)}
            size="small"
            shape="circle"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b">
        <div className="flex items-center gap-3">
          <Button
            icon={<ArrowLeft size={16} />}
            type="text"
            className="text-gray-600"
          />
          <h1 className="text-xl font-semibold text-gray-800">Earnings</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter:</span>
          <Button size="small" className="text-gray-600 border-gray-300">
            Month
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
            components: {
              Table: {
                headerBg: "#48B1DB",
                headerColor: "#ffffff",
                headerBorderRadius: 8,
                borderColor: "#e8f4f8",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 650 }}
            className="shadow-sm"
          />
        </ConfigProvider>
      </div>

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
            Earning Details
          </h1>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Serial Number:</p>
              <p className="text-gray-800">{selectedEarning?.sl || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Team Name:</p>
              <p className="text-gray-800">{selectedEarning?.teamName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Transaction ID:</p>
              <p className="text-gray-800 font-mono">{selectedEarning?.transactionId || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Amount:</p>
              <p className="text-gray-800 font-semibold text-lg">{selectedEarning?.amount || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="font-medium text-gray-600">Status:</p>
              <Tag
                color={getStatusColor(selectedEarning?.status)}
                style={{
                  borderRadius: "12px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: getStatusTextColor(selectedEarning?.status),
                  border: "none",
                }}
              >
                {selectedEarning?.status || "N/A"}
              </Tag>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamsEarnings;