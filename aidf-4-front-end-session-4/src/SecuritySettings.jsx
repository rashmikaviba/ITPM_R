import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SecuritySettings = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleDeleteAccount = async () => {
    try {
      const sessionResponse = await axios.get("http://localhost:5001/session", {
        withCredentials: true,
      });

      if (!sessionResponse.data.email) {
        alert("User not logged in!");
        return;
      }

      const userEmail = sessionResponse.data.email;
      const response = await axios.delete(
        `http://localhost:5001/Users/${userEmail}`,
        {
          data: { userEmail, password }, // Pass the password in the request body
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.message);
      alert("Account deleted successfully!");

      // Clear session and navigate to home page
      await axios.post(
        "http://localhost:5001/Users/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to delete account");
      } else {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting the account");
      }
    } finally {
      setShowDeletePopup(false);
    }
  };

  return (
    <div className="p-6 flex-1 text-left">
      <div className="mb-4 text-blue-500">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          Profile
        </span>{" "}
        &gt; Settings
      </div>
      <h2 className="text-2xl font-semibold">Security Settings</h2>
      <p className="text-gray-600 text-sm mt-1">
        Change your security settings, set up secure authentication, or delete
        your account.
      </p>

      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Delete account</p>
          <button
            className="px-6 py-2 border rounded-2xl bg-gray-200 hover:bg-gray-300"
            onClick={() => setShowDeletePopup(true)}
          >
            Delete account
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Change Password</p>
          <button className="px-6 py-2 border rounded-2xl bg-gray-200 hover:bg-gray-300">
            Change Password
          </button>
        </div>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">
              Please enter your password to confirm account deletion.
            </p>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDeleteAccount}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
