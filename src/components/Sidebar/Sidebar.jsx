import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "../../assets/data";

import {
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiPlusCircle,
  FiMenu,
} from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [activeItem, setActiveItem] = useState(0);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
    if (sidebarData[index].subItems) {
      toggleExpand(index);
    }
  };

  return (
    <div
      className={`h-screen rounded-2xl bg-white flex flex-col border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header with Collapse Button */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center">
            <MdLocalHospital className="text-2xl text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-blue-800">MediCare</h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-600"
        >
          <FiMenu className="text-lg" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {sidebarData.map((item, index) => (
          <div key={index} className="mb-1">
            {/* Parent Item */}
            <div
              className={`flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer group
                ${
                  activeItem === index
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }
                ${collapsed ? "justify-center" : "justify-between"}
              `}
              onClick={() => handleItemClick(index)}
            >
              <div className="flex items-center">
                <Link
                  to={item.link}
                  className={`${
                    activeItem === index ? "text-blue-600" : "text-gray-500"
                  } group-hover:text-blue-500`}
                >
                  <item.icon />
                </Link>
                {!collapsed && (
                  <Link to={item.link} className="ml-3 text-sm font-medium">
                    {item.title}
                  </Link>
                )}
              </div>
              {!collapsed && item.subItems && (
                <span className="text-gray-400 text-xs">
                  {expandedItems[index] ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )}
                </span>
              )}
            </div>

            {/* Sub Items - Only show when not collapsed */}
            {!collapsed && item.subItems && expandedItems[index] && (
              <div className="ml-8 mt-1 space-y-1 animate-fadeIn">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    to={subItem.link}
                    key={subIndex}
                    className="block p-2 pl-4 rounded-md text-xs text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions (Visible when expanded) */}
      {!collapsed && (
        <div className="p-3 border-t border-gray-200">
          <button className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
            <FiPlusCircle className="mr-2" />
            New Patient
          </button>
        </div>
      )}

      {/* User Profile */}
      <div
        className={`p-3 border-t border-gray-200 flex ${
          collapsed ? "justify-center" : "justify-between items-center"
        }`}
      >
        {!collapsed ? (
          <>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                DR
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-800">
                  Dr. Smith
                </div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <FiLogOut />
            </button>
          </>
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            DR
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
