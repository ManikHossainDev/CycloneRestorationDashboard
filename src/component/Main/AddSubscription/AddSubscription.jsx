import { useState } from "react";
import { Plus, X } from "lucide-react";

const AddSubscription = () => {
  const [formData, setFormData] = useState({
    subscriptionName: "",
    subscriptionPrice: "",
    subscriptionDuration: "",
    additionalFields: [""]
  });

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (index, value) => {
    const newFields = [...formData.additionalFields];
    newFields[index] = value;
    setFormData(prev => ({
      ...prev,
      additionalFields: newFields
    }));
  };

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      additionalFields: [...prev.additionalFields, ""]
    }));
  };

  const removeField = (index) => {
    if (formData.additionalFields.length > 1) {
      const newFields = formData.additionalFields.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        additionalFields: newFields
      }));
    }
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    // Add your save logic here
    alert("Subscription saved successfully!");
  };

  return (
    <div className="max-w-md bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-md">
      <div className="space-y-6">
        {/* Subscription Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Name
          </label>
          <div className="relative">
            <select
              value={formData.subscriptionName}
              onChange={(e) => handleSelectChange('subscriptionName', e.target.value)}
              className="w-full px-4 py-3 border border-cyan-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none"
            >
              <option value="">Type name</option>
              <option value="basic">Basic Plan</option>
              <option value="premium">Premium Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subscription Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription price
          </label>
          <div className="relative">
            <select
              value={formData.subscriptionPrice}
              onChange={(e) => handleSelectChange('subscriptionPrice', e.target.value)}
              className="w-full px-4 py-3 border border-cyan-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none"
            >
              <option value="">Type price</option>
              <option value="9.99">$9.99</option>
              <option value="19.99">$19.99</option>
              <option value="29.99">$29.99</option>
              <option value="49.99">$49.99</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subscription Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Duration
          </label>
          <div className="relative">
            <select
              value={formData.subscriptionDuration}
              onChange={(e) => handleSelectChange('subscriptionDuration', e.target.value)}
              className="w-full px-4 py-3 border border-cyan-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none"
            >
              <option value="">Type duration</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Additional Input Fields */}
        <div className="space-y-3">
          {formData.additionalFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={field}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Enter additional information"
                className="flex-1 px-4 py-3 border border-cyan-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
              <div className="flex space-x-2">
                {/* Add button - only show on last field */}
                {index === formData.additionalFields.length - 1 && (
                  <button
                    onClick={addField}
                    className="w-10 h-10 bg-cyan-400 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                )}
                {/* Remove button - show on all fields except the last one, and only when there's more than one field */}
                {formData.additionalFields.length > 1 && index !== formData.additionalFields.length - 1 && (
                  <button
                    onClick={() => removeField(index)}
                    className="w-10 h-10 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddSubscription;