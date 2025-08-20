import { useState } from "react";
import {
  Modal,
  Space,
  Table,
  ConfigProvider,
  Button,
  Input,
} from "antd";
import { AiFillEye } from "react-icons/ai";
import { BsFillFileCodeFill } from "react-icons/bs";
import { IoMdAddCircle, IoIosCloseCircle } from "react-icons/io";
import moment from "moment";
import {
  useCreateManagerMutation,
  useGetManagersQuery,
} from "../../../redux/features/Manager/Manager";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import Swal from "sweetalert2";
import { useBlockUserMutation, useUnblockUserMutation } from "../../../redux/features/block/block";

const Manager = () => {
  const [isAddManagerModalVisible, setIsAddManagerModalVisible] = useState(false);
  const [isManagerDetailsModalVisible, setIsManagerDetailsModalVisible] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const [formData, setFormData] = useState({ email: "", access: "manager" });
  const [ZoneCodes, setZoneCodes] = useState([""]);

  // API hooks
  const { data, isLoading, refetch } = useGetManagersQuery();
  const [managerAdd] = useCreateManagerMutation();
  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();

  // Map API data for table
  const managers = data?.attributes?.results || [];
  const dataSource = managers.map((item, index) => ({
    key: item.id,
    sl: index + 1,
    memberName: item.fullName || "N/A",
    email: item.email,
    phoneNumber: item.phoneNumber || "N/A",
    timeAndDate: moment(item.createdAt).format("DD MMM YY,"),
    image: item.profileImage,
    raw: item,
  }));

  // Show modals
  const showManagerDetailsModal = (manager) => {
    setSelectedManager(manager.raw);
    setIsManagerDetailsModalVisible(true);
  };

  const showAddManagerModal = () => setIsAddManagerModalVisible(true);

  // Zone Code Handlers
  const handleZoneCodeChange = (index, value) => {
    const newZoneCodes = [...ZoneCodes];
    newZoneCodes[index] = value;
    setZoneCodes(newZoneCodes);
  };
  const addZoneCodeField = () => setZoneCodes([...ZoneCodes, ""]);
  const removeZoneCodeField = (index) => setZoneCodes(ZoneCodes.filter((_, i) => i !== index));

  // Reset & Close modal
  const handleCancel = () => {
    setIsAddManagerModalVisible(false);
    setIsManagerDetailsModalVisible(false);
    setFormData({ email: "", access: "manager" });
    setZoneCodes([""]);
    setSelectedManager(null);
  };

  // Block/Unblock Handlers
  const blockHandler = async (id) => {
    try {
      const res = await block(id);
      if (res?.data?.code === 200) {
        Swal.fire("Success", res.data.message || "User blocked successfully", "success");
        setIsManagerDetailsModalVisible(false);
        refetch();
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to block user", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while blocking", "error");
    }
  };

  const unblockHandler = async (id) => {
    try {
      const res = await unblock(id);
      if (res?.data?.code === 200) {
        Swal.fire("Success", res.data.message || "User unblocked successfully", "success");
        setIsManagerDetailsModalVisible(false);
        refetch();
      } else {
        Swal.fire("Error", res?.data?.message || "Failed to unblock user", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while unblocking", "error");
    }
  };

  // Submit Add Manager
  const handleAddManagerSubmit = async () => {
    try {
      const payload = {
        email: formData.email,
        zone: ZoneCodes.filter((z) => z.trim() !== ""),
        access: "manager",
      };
      const res = await managerAdd(payload).unwrap();
      if (res?.code === 201) {
        Swal.fire({ icon: "success", title: "Manager added successfully", text: res?.message });
        refetch();
        handleCancel();
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to add manager", text: error?.data?.message });
    }
  };

  // Table Columns
  const columns = [
    { title: "#SL", dataIndex: "sl", key: "sl", width: 60 },
    {
      title: "Member",
      dataIndex: "memberName",
      key: "memberName",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.image ? `${imageBaseUrl}${record.image}` : ""}
            alt={record.memberName}
            className="w-10 h-10 rounded-full mr-2"
          />
          {text}
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", width: 150 },
    { title: "Time & Date", dataIndex: "timeAndDate", key: "timeAndDate", width: 180 },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="bg-[#48B1DB] text-white hover:bg-[#3a9bc1]"
            icon={<AiFillEye size={16} />}
            onClick={() => showManagerDetailsModal(record)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full col-span-full md:col-span-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mb-4">Manager List</h2>
        <button
          className="bg-[#48B1DB] text-white px-4 py-2 rounded"
          onClick={showAddManagerModal}
        >
          Add Manager
        </button>
      </div>

      <ConfigProvider
        theme={{
          token: { colorBgContainer: "#EEF9FE", colorPrimary: "#48B1DB", borderRadius: 8 },
          components: { Table: { headerBg: "#48B1DB", headerColor: "#ffffff", headerBorderRadius: 8, rowHoverBg: "#f0f8ff" } },
        }}
      >
        <Table columns={columns} dataSource={dataSource} loading={isLoading} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />
      </ConfigProvider>

      {/* Modal for Adding Manager */}
      <Modal open={isAddManagerModalVisible} onCancel={handleCancel} footer={null} centered width={500} className="rounded-lg">
        <div className="text-black p-2">
          <h1 className="text-xl font-semibold my-4 text-gray-700">Add Manager</h1>
          <div className="py-2">
            <p className="font-medium text-gray-600">Email:</p>
            <Input
              size="large"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email"
            />
          </div>

          {/* Zone Codes Input */}
          <div className="py-2">
            {ZoneCodes.map((ZoneCode, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Zone Code {index + 1}</label>
                <div className="flex">
                  <div className="w-full relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BsFillFileCodeFill className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={ZoneCode}
                      onChange={(e) => handleZoneCodeChange(index, e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border rounded-xl bg-[#FFFFFF] focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter Zone code"
                    />
                    <div className="flex items-center space-x-2 ml-2 absolute right-2 top-1/2 transform -translate-y-1/2">
                      {index === ZoneCodes.length - 1 && <IoMdAddCircle size={24} className="text-gray-400 cursor-pointer" onClick={addZoneCodeField} />}
                      {ZoneCodes.length > 1 && <IoIosCloseCircle size={24} className="text-gray-400 cursor-pointer" onClick={() => removeZoneCodeField(index)} />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button size="large" className="bg-[#48B1DB] text-white w-full" onClick={handleAddManagerSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal for Manager Details */}
      <Modal open={isManagerDetailsModalVisible} onCancel={handleCancel} footer={null} centered width={500} className="rounded-lg">
        <div className="text-black p-2">
          <h1 className="text-center text-xl font-semibold my-4 text-gray-700">Manager Details</h1>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Name:</p>
              <p className="text-gray-800">{selectedManager?.fullName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Email:</p>
              <p className="text-gray-800">{selectedManager?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Phone Number:</p>
              <p className="text-gray-800">{selectedManager?.phoneNumber || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Zones:</p>
              <p className="text-gray-800">{selectedManager?.zone?.join(", ") || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="font-medium text-gray-600">Created At:</p>
              <p className="text-gray-800">{moment(selectedManager?.createdAt).format("DD MMM YY,")}</p>
            </div>
            <div className="w-full flex space-x-4 mt-6 justify-end">
              {selectedManager?.isBlocked === true ? (
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => unblockHandler(selectedManager?.id)}>
                  Unblock
                </button>
              ) : (
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => blockHandler(selectedManager?.id)}>
                  Block
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Manager;
