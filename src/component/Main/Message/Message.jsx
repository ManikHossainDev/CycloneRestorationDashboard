import { useState, useEffect } from "react";
import { Table, ConfigProvider, Space, Button, Modal } from "antd";
import { FaEye } from "react-icons/fa";
import { useGetContactQuery } from "../../../redux/features/contact/contact";
import moment from "moment/moment";

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageData, setMessageData] = useState([]);
  
  // Fetch data from the server
  const { data, isLoading } = useGetContactQuery();
  const allmessage = data?.data?.attributes?.results;

  useEffect(() => {
    if (allmessage) {
      const formattedData = allmessage.map((item, index) => ({
        key: item.id || index,
        sl: index + 1,
        userName: item.fullName,
        email: item.email,
        phone: item.phoneNumber,
        time: moment(item.createdAt).format("DD/MM/YYYY"),
        message: item.message,
      }));
      setMessageData(formattedData);
    }
  }, [allmessage]);

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedMessage(null);
  };

  const showModal = (record) => {
    setSelectedMessage(record);
    setModalVisible(true);
  };

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
      
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
     
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
     
    },
    {
      title: "Actions",
      key: "actions",
     
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => showModal(record)}
            className="bg-[#48B1DB] text-white hover:bg-[#3399cc] border-none"
            icon={<FaEye size={20} />}
            shape="circle"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">Message</h2>
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
          dataSource={messageData} // Using server data now
          pagination={{
            pageSize: 9,
            showSizeChanger: false,
          }}
          scroll={{ x: 700 }}
          bordered={false}
        />
      </ConfigProvider>

      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="read"
            type="primary"
            onClick={() => {
              // You can add your "Read" logic here
              handleModalClose();
            }}
            style={{ backgroundColor: "#48B1DB", borderColor: "#48B1DB" }}
          >
            Read
          </Button>,
          <Button
            key="unread"
            onClick={() => {
              // You can add your "Unread" logic here
              handleModalClose();
            }}
            style={{
              backgroundColor: "#48B1DB",
              borderColor: "#48B1DB",
              color: "white",
            }}
          >
            Unread
          </Button>,
        ]}
        centered
        style={{ borderRadius: "16px" }}
        width={360}
        title={<h3 className="font-semibold text-lg">Message</h3>}
      >
        {selectedMessage && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="">Name:</span>
              <span className="font-medium">{selectedMessage.userName}</span>
            </div>
            <p className="mb-4 whitespace-pre-wrap">
              {selectedMessage.message}
            </p>
            <p className="mb-1">{selectedMessage.email}</p>
            <p className="mb-4">{selectedMessage.phone}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Message;
