import { useState } from "react";
import { Table, ConfigProvider, Space, Button, Select } from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetAllTeamsQuery } from "../../../redux/features/teamList/teamList";
import dayjs from "dayjs";

const Teamslist = () => {
  const [filter, setFilter] = useState("Month");

  const { data } = useGetAllTeamsQuery();
  const allTeams = data?.attributes?.data || [];
  console.log(allTeams);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Convert API response to table format
  const dataSource = allTeams.map((team, index) => ({
    key: team.id,
    sl: String(index + 1).padStart(2, "0"),
    teamName: team.name,
    teamLead: team.email, 
    members: team.totalNumberOfTeamMembers || "N/A",
    tasks: dayjs(team.createdAt).format("DD MMM YY, hh:mm A"),
  }));

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
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg">
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
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
          loading={!data}
        />
      </ConfigProvider>
    </div>
  );
};

export default Teamslist;
