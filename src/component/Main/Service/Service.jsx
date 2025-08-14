import React, { useState } from 'react';
import { X, Upload, Filter } from 'lucide-react';

const ServiceListUI = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Hurricane Alert System',
      description: 'Stay informed with instant alerts when a Hurricane is detected near you.',
      image: 'https://i.ibb.co.com/DDzdJC6J/dreamstimemaximum-80485485-1.png'
    },
    {
      id: 2,
      title: 'Restoration Team',
      description: 'Stay informed with instant alerts when a Hurricane is detected near you.',
      image: 'https://i.ibb.co.com/DDzdJC6J/dreamstimemaximum-80485485-1.png'
    },
    {
      id: 3,
      title: 'Application Tracking',
      description: 'Stay informed with instant alerts when a Hurricane is detected near you.',
      image: 'https://i.ibb.co.com/DDzdJC6J/dreamstimemaximum-80485485-1.png'
    },
    {
      id: 4,
      title: 'Tornado Restoration',
      description: 'Stay informed with instant alerts when a Hurricane is detected near you.',
      image: 'https://i.ibb.co.com/DDzdJC6J/dreamstimemaximum-80485485-1.png'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = () => {
    if (formData.title && formData.description) {
      const newService = {
        id: services.length + 1,
        title: formData.title,
        description: formData.description,
        image: formData.image || 'https://i.ibb.co.com/DDzdJC6J/dreamstimemaximum-80485485-1.png'
      };
      setServices([...services, newService]);
      setFormData({ title: '', description: '', image: '' });
      setIsAddModalOpen(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateService = () => {
    if (formData.title && formData.description) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, title: formData.title, description: formData.description, image: formData.image }
          : service
      ));
      setFormData({ title: '', description: '', image: '' });
      setIsEditModalOpen(false);
      setEditingService(null);
    }
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const ServiceForm = ({ onSubmit, submitText }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="service title"
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="description"
          rows={4}
          className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          required
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="flex flex-col items-center">
          <Upload className="h-16 w-16 text-gray-500 mb-3" strokeWidth={1.5} />
          <p className="text-sm font-medium text-gray-700 mb-1">Browse File</p>
          <p className="text-xs text-gray-500 mb-4">Format: .jpeg .png & Max file Size 25 MB</p>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Enter image URL (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
      >
        {submitText}
      </button>
    </div>
  );

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Service List</h1>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <Filter size={16} />
              Filter: Month
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              + Add Service
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${service.image})`}}>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {service.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Service"
        >
          <ServiceForm
            onSubmit={handleAddService}
            submitText="Update Password"
          />
        </Modal>

        {/* Edit Service Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Service"
        >
          <ServiceForm
            onSubmit={handleUpdateService}
            submitText="Update Service"
          />
        </Modal>
      </div>
    </div>
  );
};

export default ServiceListUI;