import React from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';

const ReportsDetails = () => {
  return (
    <div className=" bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl ">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl sm:text-2xl font-medium text-gray-900">Reports details</h1>
        </div>

        {/* Blue Report Card */}
        <div className="bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg p-4 sm:p-6 mb-6 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3 sm:gap-4 flex-1">
              {/* Building Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black bg-opacity-20 rounded-lg flex-shrink-0 overflow-hidden">
                <img 
                  src="https://i.ibb.co/Mk39pdJT/image-5.png"
                  alt="Building"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex-1">
                <h2 className="text-base sm:text-lg font-medium mb-2">Restoration Name: Hope After Storm</h2>
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Details</p>
                  <p className="text-sm leading-relaxed">
                    The content shared by this user appears to be illegal<br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>and should be reviewed.
                  </p>
                </div>
              </div>
            </div>
            <Trash2 className="w-5 h-5 text-white cursor-pointer flex-shrink-0" />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Report By */}
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Profile Header */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-100">
                  <img 
                    src="https://i.ibb.co/Z6hXsss9/image-1.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900">Mr. Bashar islam</h3>
              </div>

              {/* Info Rows */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm sm:text-base">Report By</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium">Bashar islam</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm sm:text-base">Email</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium">demo@gmail.com</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm sm:text-base">Phone Number</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium">028232949834</span>
                </div>
              </div>

              {/* Details Section */}
              <div className="mt-6">
                <div className="flex justify-between items-start py-2">
                  <span className="text-gray-700 text-sm sm:text-base">Details</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium text-right max-w-xs">
                    The product shared by this vendor appears to be illegal and should be reviewed.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Report User */}
          <div className="bg-white rounded-lg border border-gray-200 relative">
            {/* Blue Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-400 rounded-l-lg"></div>
            
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-600">
                  <img 
                    src="https://i.ibb.co/bjqrb68n/Ellipse-260.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900">Mr. Hisham islam</h3>
              </div>

              {/* Info Rows */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm sm:text-base">Report User</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium">Mr. Hisham islam</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm sm:text-base">Email</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium">demo@gmail.com</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm sm:text-base">Phone Number</span>
                  <span className="text-gray-900 text-sm sm:text-base font-medium">028232949834</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsDetails