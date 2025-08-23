import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../../redux/features/Subscription/Subscription";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Initialize state
  const [formData, setFormData] = useState({
    subscriptionName: "",
    subscriptionDescription: "",
    subscriptionPrice: "",
    additionalFields: [""],
  });

  const { data:subscriptionsingledata, isLoading } = useSingleSubscriptionQuery(id);
  console.log("Single Subscription Data:", subscriptionsingledata);
  const [updateSubscription] = useUpdateSubscriptionMutation();

  // Prefill data when backend returns subscription
  useEffect(() => {
    if (subscriptionsingledata?.data?.attributes) {
      const sub = subscriptionsingledata.data.attributes;
      setFormData({
        subscriptionName: sub.title || "",
        subscriptionDescription: sub.description || "",
        subscriptionPrice: sub.amount || "",
        additionalFields: sub.features?.length ? sub.features : [""],
      });
    }
  }, [subscriptionsingledata]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "subscriptionPrice" ? parseFloat(value) || "" : value,
    }));
  };

  // Handle features list
  const handleInputChange = (index, value) => {
    const newFields = [...formData.additionalFields];
    newFields[index] = value;
    setFormData((prev) => ({
      ...prev,
      additionalFields: newFields,
    }));
  };

  // Add feature
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

  // Remove feature
  const removeField = (e, index) => {
    e.preventDefault();
    const newFields = formData.additionalFields.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      additionalFields: newFields,
    }));
  };

  // Save updated subscription
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      // pass ID for update
      title: formData.subscriptionName,
      description: formData.subscriptionDescription,
      features: formData.additionalFields,
      amount: parseFloat(formData.subscriptionPrice),
    };

    // console.log("Payload to be sent:", payload);

    try {
      const res = await updateSubscription({ id, payload });
      console.log("Response from UpdateSubscription:", res);

      if (res?.data?.code === 200) {
        toast.success("Subscription updated successfully!");
        navigate("/Subscription");
      } else {
        toast.error(res?.error?.data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-md bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-md">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Subscription Name */}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.subscriptionDescription}
            onChange={(e) =>
              handleChange("subscriptionDescription", e.target.value)
            }
            placeholder="Description"
            className="w-full px-4 py-3 border border-cyan-200 rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Price
          </label>
          <input
            required
            type="number"
            value={formData.subscriptionPrice}
            onChange={(e) => handleChange("subscriptionPrice", e.target.value)}
            placeholder="Price"
            className="w-full px-4 py-3 border border-cyan-200 rounded-lg"
          />
        </div>

        {/* Features */}
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

        {/* Submit */}
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
