import { useState } from "react";
import { Modal, Space, Table, ConfigProvider, Button, Tag, Pagination } from "antd";
import { AiFillEye } from "react-icons/ai";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RestorationTask = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Complete dataset
  const allTasks = [
    {
      key: "1",
      sl: "01",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Progress",
    },
    {
      key: "2",
      sl: "02",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Progress",
    },
    {
      key: "3",
      sl: "03",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Progress",
    },
    {
      key: "4",
      sl: "04",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Progress",
    },
    {
      key: "5",
      sl: "05",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Progress",
    },
    {
      key: "6",
      sl: "06",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Complete",
    },
    {
      key: "7",
      sl: "07",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Complete",
    },
    {
      key: "8",
      sl: "08",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Complete",
    },
    {
      key: "9",
      sl: "09",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Complete",
    },
    {
      key: "10",
      sl: "10",
      title: "Hope After Storm",
      category: "Cyclone Restoration",
      target: "11 Oct 24, 11:10PM",
      location: "New York",
      status: "Complete",
    },
    {
      key: "11",
      sl: "11",
      title: "Tornado Recovery",
      category: "Tornado Restoration",
      target: "12 Oct 24, 09:30AM",
      location: "Texas",
      status: "Progress",
    },
    {
      key: "12",
      sl: "12",
      title: "Fire Damage Repair",
      category: "Fire Restoration",
      target: "13 Oct 24, 02:15PM",
      location: "California",
      status: "Complete",
    },
    {
      key: "13",
      sl: "13",
      title: "Tornado Cleanup",
      category: "Tornado Restoration",
      target: "14 Oct 24, 08:45AM",
      location: "Oklahoma",
      status: "Progress",
    },
    {
      key: "14",
      sl: "14",
      title: "Wildfire Recovery",
      category: "Fire Restoration",
      target: "15 Oct 24, 05:20PM",
      location: "Arizona",
      status: "Complete",
    },
    {
      key: "15",
      sl: "15",
      title: "Storm Damage Assessment",
      category: "Cyclone Restoration",
      target: "16 Oct 24, 12:00PM",
      location: "Florida",
      status: "Progress",
    },
  ];

  // Filter tabs
  const filterTabs = [
    { key: "All", label: "All", count: allTasks.length },
    { key: "Cyclone Restoration", label: "Cyclone Restoration", count: allTasks.filter(task => task.category === "Cyclone Restoration").length },
    { key: "Tornado Restoration", label: "Tornado Restoration", count: allTasks.filter(task => task.category === "Tornado Restoration").length },
    { key: "Fire Restoration", label: "Fire Restoration", count: allTasks.filter(task => task.category === "Fire Restoration").length },
  ];

  // Filter data based on active filter
  const getFilteredData = () => {
    if (activeFilter === "All") {
      return allTasks;
    }
    return allTasks.filter(task => task.category === activeFilter);
  };

  const filteredData = getFilteredData();
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const showModal = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Progress":
        return "#FFA500"; // Orange
      case "Complete":
        return "#52C41A"; // Green
      default:
        return "#1890FF"; // Blue
    }
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      width: 60,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 180,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 160,
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      width: 140,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          style={{
            borderRadius: "12px",
            padding: "2px 12px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/task/${record.key}`}>
            <Button
              className="bg-[#48B1DB] text-white hover:bg-[#3a9bc1] border-none"
              icon={<AiFillEye size={16} />}
              onClick={() => showModal(record)}
              size="small"
              shape="circle"
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b">
        <div className="flex items-center gap-3">
          <Button
            icon={<ArrowLeft size={16} />}
            type="text"
            className="text-gray-600"
          />
          <h1 className="text-xl font-semibold text-gray-800">Restoration Task List</h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-6 pb-0">
        <div className="flex gap-2 mb-6">
          {filterTabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => handleFilterChange(tab.key)}
              className={`px-4 py-2 rounded-full border ${
                activeFilter === tab.key
                  ? "bg-[#48B1DB] text-white border-[#48B1DB]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#48B1DB] hover:text-[#48B1DB]"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="px-6">
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#ffffff",
              colorPrimary: "#48B1DB",
              borderRadius: 8,
            },
            components: {
              Table: {
                headerBg: "#48B1DB",
                headerColor: "#ffffff",
                headerBorderRadius: 8,
                rowHoverBg: "#f8fcff",
                borderColor: "#e8f4f8",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={currentData}
            pagination={false}
            scroll={{ x: 900 }}
            className="shadow-sm"
          />
        </ConfigProvider>

        {/* Custom Pagination */}
        <div className="flex justify-end mt-6 pb-6">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper={false}
            className="text-[#48B1DB]"
          />
        </div>
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
            Task Details
          </h1>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Title:</p>
              <p className="text-gray-800">{selectedTask?.title || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Category:</p>
              <p className="text-gray-800">{selectedTask?.category || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Target Date:</p>
              <p className="text-gray-800">{selectedTask?.target || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <p className="font-medium text-gray-600">Location:</p>
              <p className="text-gray-800">{selectedTask?.location || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="font-medium text-gray-600">Status:</p>
              <Tag
                color={getStatusColor(selectedTask?.status)}
                style={{
                  borderRadius: "12px",
                  padding: "2px 12px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {selectedTask?.status || "N/A"}
              </Tag>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RestorationTask;