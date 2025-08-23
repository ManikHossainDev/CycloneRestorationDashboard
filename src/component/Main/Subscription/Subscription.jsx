import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteSubscriptionMutation, useGetSubscriptionQuery } from "../../../redux/features/Subscription/Subscription";
import Swal from "sweetalert2";

const Subscription = () => {
  const { data, refetch,  } = useGetSubscriptionQuery();
  console.log(data, "data from api");
  const AllData = data?.attributes?.results || [];
  console.log(AllData);

  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const RemoveHandle = async (id) => {
    console.log(id);
    try {
      const res = await deleteSubscription(id);
      console.log(res);
      if (res?.code === 200) {
        refetch();
        Swal.fire("Deleted!", "Your subscription has been deleted.", "success");
      }
    } catch (err) {
      console.log("Error deleting subscription:", err);
    }
  };

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Subscription</h2>
        <Link to="/AddSubscription">
          <button className="bg-[#02AEF4] text-white py-2 px-3 rounded-md font-semibold">
            Add Subscription
          </button>
        </Link>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {AllData.map((sub, index) => (
          <div key={sub.id || index} className="bg-white rounded-lg border-2 border-blue-200 w-full shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b-2 border-blue-200 py-4">
                {sub.title}
              </h3>
              <div className="flex space-x-2 justify-center">
                <div className="text-4xl font-bold text-gray-900">
                {sub.amount === 0 ? "Free" : `$${sub.amount}`}
              </div>
              <div className="text-sm text-gray-500">
                <br />
                <div>
                  / {Math.round(sub.days / 30)} Month{Math.round(sub.days / 30) > 1 && "s"}
                </div>
              </div>
              </div>
            </div>

            <div className="space-y-3 mb-6 px-2 md:px-6">
              {sub.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 p-2 md:p-6">
              <Link
                to={`/Subscription/${sub.id}`}
                className="text-center flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => RemoveHandle(sub.id)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
