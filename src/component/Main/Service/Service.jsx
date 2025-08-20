import React, { useState, useEffect } from "react";
import { X, Upload, Filter } from "lucide-react";
import { message } from "antd";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetServicesQuery,
  useDeleteServiceMutation,
} from "../../../redux/features/services/services";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import Swal from "sweetalert2";

const Service = () => {
  const { data, refetch } = useGetServicesQuery();
  const [createService] = useCreateServiceMutation();

  const allServicesFromAPI = data?.data?.attributes?.results || [];
  const [services, setServices] = useState([]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Image preview states
  const [formDataAdd, setFormDataAdd] = useState({ image: "" });
  const [formDataEdit, setFormDataEdit] = useState({ image: "" });

  useEffect(() => {
    if (allServicesFromAPI.length > 0) {
      const formatted = allServicesFromAPI.map((service) => ({
        id: service.id,
        title: service.title,
        description: service.description,
        image: service.image ? `${imageBaseUrl}${service.image}` : "",
      }));
      setServices(formatted);
    }
  }, [allServicesFromAPI]);

  // Handle image preview
  const handleImageUpload = (event, isEdit = false) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      message.error("File size must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      message.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setFormDataEdit({ image: reader.result });
      } else {
        setFormDataAdd({ image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Service
  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = document.getElementById("addImageUpload");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    if (file) formData.append("image", file);

    try {
      const res = await createService(formData).unwrap();
      if (res?.code === 201) {
        refetch();
        setIsAddModalOpen(false);
        setFormDataAdd({ image: "" });
        form.reset();
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to add service");
    }
  };

  // Update Service
  const [updateService] = useUpdateServiceMutation();
  const handleUpdateService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = document.getElementById("editImageUpload");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    if (file) formData.append("image", file);

    const data = { data: formData, id: editingService.id };

    try {
      const res = await updateService(data).unwrap();
      if (res?.code === 200) {
        refetch();
        setIsEditModalOpen(false);
        setEditingService(null);
        setFormDataEdit({ image: "" });
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to update service");
    }
  };

  // Open edit modal
  const handleEditService = (service) => {
    setEditingService(service);
    setFormDataEdit({ image: service.image });
    setIsEditModalOpen(true);
  };

  // Delete (local only)
  const [deleteService] = useDeleteServiceMutation();
  const handleDeleteService = async (id) => {
    try {
      const res = await deleteService(id).unwrap();
      if (res?.code === 200) {
        refetch();
        Swal.fire(
          "Success",
          res?.message || "Service deleted successfully",
          "success"
        );
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete service");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Service List</h1>
        <div className="flex gap-4">
          {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            <Filter size={16} />
            Filter: Month
          </button> */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            + Add Service
          </button>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.image})` }}
            /> */}
            <img
              src={service.image}
              alt={service.title || "Service"}
              className="w-full h-48 object-cover"
            />
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Service
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddService} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Service title"
                required
                className="w-full px-3 py-2 border border-blue-300 rounded-md"
              />
              <textarea
                name="description"
                placeholder="Description"
                rows={4}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md"
              />

              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  id="addImageUpload"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e)}
                />
                {formDataAdd.image ? (
                  <img
                    src={formDataAdd.image}
                    alt="Uploaded"
                    className="w-full h-auto cursor-pointer"
                    onClick={() =>
                      document.getElementById("addImageUpload").click()
                    }
                  />
                ) : (
                  <div
                    onClick={() =>
                      document.getElementById("addImageUpload").click()
                    }
                    className="flex flex-col items-center"
                  >
                    <Upload className="h-16 w-16 text-gray-500 mb-3" />
                    <p>Browse File</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                Add Service
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Service
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateService} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={editingService?.title}
                required
                className="w-full px-3 py-2 border border-blue-300 rounded-md"
              />
              <textarea
                name="description"
                defaultValue={editingService?.description}
                rows={4}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md"
              />

              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  id="editImageUpload"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, true)}
                />
                {formDataEdit.image ? (
                  <img
                    src={formDataEdit.image}
                    alt="Uploaded"
                    className="w-full h-auto cursor-pointer"
                    onClick={() =>
                      document.getElementById("editImageUpload").click()
                    }
                  />
                ) : (
                  <div
                    onClick={() =>
                      document.getElementById("editImageUpload").click()
                    }
                    className="flex flex-col items-center"
                  >
                    <Upload className="h-16 w-16 text-gray-500 mb-3" />
                    <p>Browse File</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                Update Service
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
