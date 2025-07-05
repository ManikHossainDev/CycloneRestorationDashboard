import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const AddTeamMember = () => (
  <div className=" bg-white p-6 rounded-lg shadow">
     <div  className='w-full md:max-w-5xl mx-auto'>
     <div className="flex items-center mb-16">
      <div className="relative">
        <img
          src="https://i.ibb.co/gLpTvy9K/Ellipse-1237.png" 
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
          <FaPencilAlt className="text-gray-500" />
        </button>
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-semibold">Hisham</h2>
        <p className="text-gray-500">Team Leader</p>
      </div>
    </div>

    <label htmlFor="memberCount" className="block text-gray-700 font-medium mb-2">
      Member Count Number
    </label>
    <input
      type="number"
      id="memberCount"
      placeholder="Enter the total team member count"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 mb-6"
    />

    <button
      className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-3 rounded-lg transition"
    >
      Save & Change
    </button>
     </div>
  </div>
);

export default AddTeamMember;
