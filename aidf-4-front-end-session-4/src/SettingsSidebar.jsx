import React from "react";

const SettingsSidebar = ({ active }) => {
  const menuItems = [
    { name: "Security Settings", key: "security" },
    { name: "Travel Activities", key: "travel" },
    { name: "Payment info", key: "payment" },
    { name: "Customization preferences", key: "customization" },
    { name: "Help & Support", key: "support" },
  ];

  return (
    <div className="w-64 bg-blue-500 p-4 h-screen">
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`w-full text-left px-4 py-2 my-1 rounded ${
            active === item.key ? "bg-blue-600 text-white" : "bg-gray-300"
          } hover:bg-blue-400`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SettingsSidebar;
