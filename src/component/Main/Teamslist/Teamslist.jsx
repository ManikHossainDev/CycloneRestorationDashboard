import { useState } from "react";
import { Table, ConfigProvider, Space, Button, Select } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Teamslist = () => {
  const [filter, setFilter] = useState("Month");

  // Updated dataSource to match the image
  const dataSource = [
    {
      key: "1",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "2",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "3",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "4",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "5",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "6",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "7",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "8",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "9",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
    {
      key: "10",
      sl: "01",
      teamName: "Fir Force",
      teamLead: "Alex T.",
      members: 4,
      tasks: "3 Ongoing",
    },
  ];

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Team Lead",
      dataIndex: "teamLead",
      key: "teamLead",
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/Teamslist/${record.key}`}>
            <Button
              className="bg-[#48B1DB] text-white"
              icon={<AiFillEye size={20} />}
            ></Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg">
      {/* Header with Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Teams list</h2>
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

      {/* Teams Table */}
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
          }}
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Teamslist;