import { useState } from "react";
import { Table, ConfigProvider, Space, Button, Select } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import dayjs from "dayjs"; // For formatting date/time

const UserManagement = () => {
  const { data } = useGetAllUsersQuery();
  const allUsers =  data?.attributes?.data;

  const [filter, setFilter] = useState("Month");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Transform the API response to table format
  const dataSource = allUsers?.map((user, index) => ({
    key: user._id,
    sl: String(index + 1).padStart(2, "0"),
    userName: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone || "N/A",
    timeAndDate: dayjs(user.createdAt).format("DD MMM YY, hh:mm A"),
    userImage: user.profilePictureUrl || "https://i.ibb.co/0C5x0zk/Ellipse-1232.png",
  })) || [];

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
      title: " Address",
      dataIndex: "address",
      key:"address"
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
          <Link to={`/users/${record.key}`}>
            <Button
              className="bg-[#48B1DB] text-white"
              icon={<AiFillEye size={20} />}
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">User List</h2>
        <Select
          value={filter}
          onChange={handleFilterChange}
          options={[
            { value: "Month", label: "Filter: Month" },
            { value: "Week", label: "Filter: Week" },
            { value: "Year", label: "Filter: Year" },
          ]}
          className="w-32"
        />
      </div>

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
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1000 }}
          loading={!allUsers}
        />
      </ConfigProvider>
    </div>
  );
};

export default UserManagement;
