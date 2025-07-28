import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../../redux/features/Subscription/Subscription";
import { toast } from "sonner";

const EditSubscription = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useSingleSubscriptionQuery(id);
  const [UpdateSubscription] = useUpdateSubscriptionMutation();

  const [formData, setFormData] = useState({
    subscriptionName: "",
    subscriptionPrice: "",
    subscriptionDuration: "",
    planId: "",
    additionalFields: [""],
  });

  useEffect(() => {
    if (data?.data) {
      const sub = data.data;
      setFormData({
        subscriptionName: sub.name || "",
        subscriptionPrice: sub.price || "",
        subscriptionDuration: sub.durationInMonths || "",
        planId: sub.planId || "free",
        additionalFields: sub.features?.length ? sub.features : [""],
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (index, value) => {
    const newFields = [...formData.additionalFields];
    newFields[index] = value;
    setFormData((prev) => ({
      ...prev,
      additionalFields: newFields,
    }));
  };

  const addField = (e) => {
  e.preventDefault();
  if (formData.additionalFields.length >= 5) {
    toast.warning("You can add up to 5 features only.");
    return;
  }
  setFormData((prev) => ({
    ...prev,
    additionalFields: [...prev.additionalFields, ""],
  }));
};

  const removeField = (e, index) => {
    e.preventDefault();
    if (formData.additionalFields.length > 1) {
      const newFields = formData.additionalFields.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        additionalFields: newFields,
      }));
    }
  };

  const UpdateHandle = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.subscriptionName,
      price: parseFloat(formData.subscriptionPrice),
      durationInMonths: parseInt(formData.subscriptionDuration),
      planId: formData.planId,
      features: formData.additionalFields,
    };

    try {
      const res = await UpdateSubscription({ id, data: payload });
      if (res?.data?.success === true) {
         navigate("/Subscription");
      } 
    } catch (error) {
      console.error("Update error:", error);      
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-md">
      <form onSubmit={UpdateHandle} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Name
          </label>
          <input
            type="text"
            required
            value={formData.subscriptionName}
            onChange={(e) => handleChange("subscriptionName", e.target.value)}
            placeholder="Subscription Name"
            className="w-full px-4 py-3 border border-cyan-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Price
          </label>
          <input
            type="number"
            required
            value={formData.subscriptionPrice}
            onChange={(e) => handleChange("subscriptionPrice", e.target.value)}
            placeholder="Price"
            className="w-full px-4 py-3 border border-cyan-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (Months)
          </label>
          <input
            type="number"
            required
            value={formData.subscriptionDuration}
            onChange={(e) => handleChange("subscriptionDuration", e.target.value)}
            placeholder="Duration in Months"
            className="w-full px-4 py-3 border border-cyan-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan
          </label>
          <div className="relative">
            <select
              value={formData.planId}
              onChange={(e) => handleChange("planId", e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-cyan-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="pro">Pro</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {formData.additionalFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={field}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Feature"
                className="flex-1 px-4 py-3 border border-cyan-200 rounded-lg"
              />
              <div className="flex space-x-2">
                {index === formData.additionalFields.length - 1 && (
                  <button
                    onClick={addField}
                    className="w-10 h-10 bg-cyan-400 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center"
                  >
                    <Plus size={18} />
                  </button>
                )}
                {formData.additionalFields.length > 1 && (
                  <button
                    onClick={(e) => removeField(e, index)}
                    className="w-10 h-10 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditSubscription;
