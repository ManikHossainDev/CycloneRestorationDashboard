import { useState } from "react";
import {
  Table,
  ConfigProvider,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAllTeamsQuery } from "../../../redux/features/teamList/teamList";


const ContractorList = () => {
  const { data, isLoading } = useGetAllTeamsQuery();
 

  const allContractors = data?.attributes?.results || [];
  console.log('all contractors', allContractors)


  // ✅ map contractors safely
  const dataSource = allContractors.map((c, index) => ({
    key: c.id,
    sl: String(index + 1).padStart(2, "0"),
    fullName: c.fullName,
    email: c.email,
    role: c.role,
    phone: `${c.callingCode ?? ""}${c.phoneNumber ?? ""}`,
    createdAt: c.createdAt
      ? dayjs(c.createdAt).format("DD MMM YY, hh:mm A")
      : "N/A",
  }));

  const columns = [
    { title: "#SL", dataIndex: "sl", key: "sl" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link >
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
        <h2 className="font-semibold text-xl">Contractor List</h2>
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
          loading={isLoading}
          locale={{ emptyText: "No Contractors Found" }}
        />
      </ConfigProvider>

      
    </div>
  );
};

export default ContractorList;
