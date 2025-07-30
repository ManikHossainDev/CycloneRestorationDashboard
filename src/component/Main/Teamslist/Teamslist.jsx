import { useState } from "react";
import {
  Table,
  ConfigProvider,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetAllTeamsQuery } from "../../../redux/features/teamList/teamList";
import dayjs from "dayjs";
import { ChevronDown, Upload as UploadIcon } from "lucide-react";

const Teamslist = () => {
  const { data } = useGetAllTeamsQuery();
  const allTeams = data?.attributes?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddTeam = (values) => {
    console.log("New team values:", values);
    message.success("Team added successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  const dataSource = allTeams.map((team, index) => ({
    key: team.id,
    sl: String(index + 1).padStart(2, "0"),
    teamName: team.name,
    teamLead: team.email,
    members: team.totalNumberOfTeamMembers || "N/A",
    tasks: dayjs(team.createdAt).format("DD MMM YY, hh:mm A"),
  }));

  const columns = [
    { title: "#SL", dataIndex: "sl", key: "sl" },
    { title: "Team Name", dataIndex: "teamName", key: "teamName" },
    { title: "Team Lead", dataIndex: "teamLead", key: "teamLead" },
    { title: "Members", dataIndex: "members", key: "members" },
    { title: "Tasks", dataIndex: "tasks", key: "tasks" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
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

  const uploadProps = {
    name: "file",
    beforeUpload: () => false,
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <div className="w-full rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Teams list</h2>
        <button
          onClick={showModal}
          className="px-3 py-2 bg-[#48B1DB] text-white rounded text-xl"
        >
          Add Team
        </button>
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

      {/* Add Team Modal */}
      <Modal
        title={
          <div className="text-lg font-medium text-gray-800 mb-4">Add Team</div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        styles={{
          header: {
            borderBottom: "none",
            paddingBottom: 0,
          },
          body: {
            paddingTop: 0,
          },
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTeam}>
          <Form.Item
            name="teamName"
            label={<span className="text-gray-700 font-medium">Team Name</span>}
            rules={[{ required: true, message: "Please enter team name" }]}
            className="mb-6"
          >
            <Input
              size="large"
              placeholder="team name"
              className="rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            name="teamLead"
            label={<span className="text-gray-700 font-medium">Team Lead</span>}
            rules={[{ required: true, message: "Please enter team lead" }]}
            className="mb-6"
          >
            <Input
              size="large"
              placeholder="description"
              className="rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            name="teamMember"
            label={
              <span className="text-gray-700 font-medium">Team Member</span>
            }
            rules={[{ required: true, message: "Please select a member" }]}
            className="mb-6"
          >
            <Select
              size="large"
              placeholder="add member"
              suffixIcon={<ChevronDown className="text-gray-400" size={16} />}
              className="rounded-md"
            >
              <Select.Option value="john">John Doe</Select.Option>
              <Select.Option value="jane">Jane Smith</Select.Option>
              <Select.Option value="mike">Mike Johnson</Select.Option>
              <Select.Option value="sarah">Sarah Wilson</Select.Option>
            </Select>
          </Form.Item>


          {/* input size */}          
          <Form.Item name="fileUpload" className="mb-8 w-full">
            <Upload {...uploadProps} className="w-full">
              <div
                className="w-full border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                style={{
                  borderColor: "#7dd3fc",
                  backgroundColor: "#f0f9ff",
                }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <UploadIcon className="text-gray-500" size={24} />
                  <div className="text-gray-700 font-medium">Browse File</div>

                  <Button
                    className="mt-2 bg-blue-400 text-white border-none hover:bg-blue-500"
                    size="small"
                    style={{
                      backgroundColor: "#60a5fa",
                      borderRadius: "4px",
                    }}
                  >
                    Browse
                  </Button>
                </div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-blue-400 hover:bg-blue-500 border-none text-white font-medium"
              style={{
                backgroundColor: "#60a5fa",
                borderRadius: "6px",
                height: "48px",
                fontSize: "16px",
              }}
            >
              Create Team
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teamslist;
