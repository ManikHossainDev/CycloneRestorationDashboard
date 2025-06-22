import React, { useState } from 'react';
import { Table, Button, Modal, Upload, ConfigProvider } from 'antd';
import { EyeOutlined, CameraOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const PaymentRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Sample data matching the image
  const dataSource = Array.from({ length: 9 }, (_, index) => ({
    key: index + 1,
    id: '01',
    teamLeadName: 'Bashar',
    teamName: 'Fix Force',
    mainBalance: 1000,
    withdrawalBalance: 900,
    availableBalance: 100,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`
  }));

  const handleViewClick = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleApprove = () => {
    console.log('Payment request approved!');
    setIsModalVisible(false);
  };

  const handleDecline = () => {
    console.log('Payment request declined!');
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '#SI',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center',
      render: (text) => <span className="">{text}</span>,
    },
    {
      title: 'Team Lead Name',
      dataIndex: 'teamLeadName',
      key: 'teamLeadName',
      width: 200,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img 
            src={record.avatar} 
            alt={text}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <span className="font-medium text-gray-800">{text}</span>
        </div>
      ),
    },
    {
      title: 'Team Name',
      dataIndex: 'teamName',
      key: 'teamName',
      width: 150,
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: 'Main Balance',
      dataIndex: 'mainBalance',
      key: 'mainBalance',
      width: 150,
      render: (amount) => <span className="font-semibold text-gray-800">${amount}</span>,
    },
    {
      title: 'Withdrawal Balance',
      dataIndex: 'withdrawalBalance',
      key: 'withdrawalBalance',
      width: 180,
      render: (amount) => <span className="font-semibold text-gray-800">${amount}</span>,
    },
    {
      title: 'Available Balance',
      dataIndex: 'availableBalance',
      key: 'availableBalance',
      width: 160,
      render: (amount) => <span className="font-semibold text-gray-800">${amount}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined className="text-gray-600 text-lg" />}
          onClick={() => handleViewClick(record)}
          className="flex items-center justify-center hover:bg-gray-100 border-0 shadow-none"
        />
      ),
    },
  ];

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    beforeUpload: () => false, // Prevent auto upload
    showUploadList: false,
  };

  return (
    
      <div className="">
        <div className="">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />} 
                className="text-gray-600 hover:bg-gray-100 border-0 shadow-none flex items-center justify-center"
              />
              <h1 className="text-2xl font-semibold text-gray-800">Payment Request</h1>
            </div>
            <Button className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 rounded-lg px-4 py-2 font-medium">
              Filter : Month
            </Button>
          </div>

          {/* Table with custom styling */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
            pageSize: 9,
            showSizeChanger: false,
          }}
          scroll={{ x: 700 }}
          bordered={false}
        />
      </ConfigProvider>
          </div>

          {/* Withdrawal Request Modal */}
          <Modal
            title="Withdrawal Request"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={500}
            className="withdrawal-modal"
            centered
          >
            {selectedRecord && (
              <div className="space-y-6 pt-4">
                {/* Withdrawal Balance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Withdrawal Balance
                  </label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <span className="text-xl font-semibold text-gray-800">
                      $ {selectedRecord.withdrawalBalance}
                    </span>
                  </div>
                </div>

                {/* Balance Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Main Balance
                    </label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <span className="text-lg font-semibold text-gray-800">
                        $ {selectedRecord.mainBalance}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Balance
                    </label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <span className="text-lg font-semibold text-gray-800">
                        $ {selectedRecord.availableBalance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upload Photo */}
                <div>
                  <Upload.Dragger 
                    {...uploadProps} 
                    className="bg-blue-50  rounded-lg"
                  >
                    <div className="flex flex-col items-center justify-center py-8">
                      <CameraOutlined className="text-3xl text-blue-500 mb-3" />
                      <span className="text-blue-600 font-medium text-base">Upload Photo</span>
                    </div>
                  </Upload.Dragger>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6">
                  <Button 
                    onClick={handleDecline}
                    className="px-8 py-2 h-10 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 rounded-lg font-medium"
                  >
                    Decline
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleApprove}
                    className="px-8 py-2 h-10 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg font-medium"
                  >
                    Approved
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>

   
  );
};

export default PaymentRequest;