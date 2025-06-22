import React from "react";
import { Space, Table, ConfigProvider } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Reports = () => {
  const dataSource = [
    {
      key: "1",
      sl: "01",
      reportedBy: "Basar Islam",
      vendorName: "Bashar",
      type: "Illegal",
      date: "11 April, 2025",
    },
    {
      key: "2",
      sl: "02",
      reportedBy: "Ayesha Khan",
      vendorName: "Rafiq",
      type: "Spam",
      date: "10 April, 2025",
    },
    {
      key: "3",
      sl: "03",
      reportedBy: "Jamal Uddin",
      vendorName: "Sami",
      type: "Fraud",
      date: "09 April, 2025",
    },
    {
      key: "4",
      sl: "04",
      reportedBy: "Nadia Rahman",
      vendorName: "Rana",
      type: "Illegal",
      date: "08 April, 2025",
    },
    {
      key: "5",
      sl: "05",
      reportedBy: "Hasan Ali",
      vendorName: "Farhan",
      type: "Spam",
      date: "07 April, 2025",
    },
    {
      key: "6",
      sl: "06",
      reportedBy: "Salma Begum",
      vendorName: "Jamal",
      type: "Fraud",
      date: "06 April, 2025",
    },
    {
      key: "7",
      sl: "07",
      reportedBy: "Kamal Hossain",
      vendorName: "Tariq",
      type: "Illegal",
      date: "05 April, 2025",
    },
    {
      key: "8",
      sl: "08",
      reportedBy: "Fatima Noor",
      vendorName: "Salim",
      type: "Spam",
      date: "04 April, 2025",
    },
    {
      key: "9",
      sl: "09",
      reportedBy: "Rafiq Chowdhury",
      vendorName: "Khalid",
      type: "Fraud",
      date: "03 April, 2025",
    },
    {
      key: "10",
      sl: "10",
      reportedBy: "Sultana Akter",
      vendorName: "Imran",
      type: "Illegal",
      date: "02 April, 2025",
    },
  ];

  const columns = [
    { title: "#SL", dataIndex: "sl", key: "sl" },
    { title: "Reported By", dataIndex: "reportedBy", key: "reportedBy" },
    { title: "Team Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/Reports/${record.key}`}>
            <InfoCircleOutlined
              style={{ fontSize: "18px", cursor: "pointer", color: "#1890ff" }}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg p-4">
      <h2 className="font-semibold py-1 text-[20px]">Reports list</h2>
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
          pagination={{
            pageSize: 10,
            position: ["bottomRight"],
          }}
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Reports;
