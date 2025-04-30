import { Home, User, Bookmark, Settings, LogOut } from "lucide-react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported for navigation

const Sidebar = () => {
  const navigate = useNavigate(); // For page redirection

  // Logout handler
  const handleLogout = async () => {
    try {
      // Send logout request to the backend
      const response = await axios.post(
        "http://localhost:5001/Users/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request (for session management)
        }
      );

      // Check if logout was successful
      if (response.status === 200) {
        // Redirect to login page after successful logout
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message if needed
    }
  };

  return (
    <div className="w-64 bg-blue-500 p-4 flex flex-col">
      {" "}
      {/* Changed bg-gray-100 to bg-blue-500 */}
      <ul className="space-y-4 flex-grow">
        <li
          className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => navigate("/Dashboard")}
        >
          <Home />
          <span>Dashboard</span>
        </li>
        <li
          className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => navigate("/Profile")}
        >
          <User />
          <span>User Profile</span>
        </li>
        <li
          className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => navigate("/Saved")}
        >
          <Bookmark />
          <span>Saved</span>
        </li>
        <li
          className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => navigate("/SecuritySettings")}
        >
          <Settings />
          <span>Settings</span>
        </li>
      </ul>
      {/* Logout button stays at the bottom */}
      <div className="mt-auto">
        <li
          className="flex items-center space-x-2 p-3 bg-blue-100 border border-red-500 text-red-500 hover:bg-blue-200 rounded-lg cursor-pointer"
          onClick={handleLogout} // Trigger logout on click
        >
          <LogOut />
          <span>Logout</span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
