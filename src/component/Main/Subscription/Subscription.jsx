import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Subscription = () => {
  const id = 1;
  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Subscription </h2>
        <Link to="/AddSubscription">
          <button className="bg-[#02AEF4] text-white py-2 px-3 rounded-md font-semibold">
            Add Subscription
          </button>
        </Link>
      </div>

      <div className="md:flex items-center space-y-5 md:space-y-0 md:space-x-4 mt-2">
        {/* Basic Plan */}
        <div className="bg-white rounded-lg border-2 border-blue-200 w-70 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-[#02AEF4] ">
              Basic
            </h3>
            <div className="text-4xl font-bold text-gray-900">Free</div>
          </div>

          <div className="space-y-3 mb-6 p-6 ">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                Early access to new features
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                Early access to new features
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                Early access to new features
              </span>
            </div>
          </div>

          <div className="flex gap-3 p-6 ">
            
              <Link to={`/Subscription/${id}`} className="text-center flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Edit
              </Link>
            

            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Delete
            </button>
          </div>
        </div>

        {/* BeastPlus Plan */}
        <div className="bg-white rounded-lg border-2 border-blue-200 w-70 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-[#02AEF4]">
              BeastPlus
            </h3>
            <div className="">
              <span className="text-4xl font-bold text-gray-900">$14.99</span>
            </div>
            <div className="text-sm text-gray-500">/ Per Month</div>
          </div>

          <div className="space-y-3  p-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                Early access to new features
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                Early access to new features
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                Early access to new features
              </span>
            </div>
          </div>

          <div className="flex gap-3 p-6">
        
              <Link to={`/Subscription/${id}`}className="text-center  flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Edit
              </Link>
            
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
