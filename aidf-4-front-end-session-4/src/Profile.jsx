import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get session data from backend
        const sessionResponse = await axios.get("http://localhost:5001/session", {
          withCredentials: true,
        });

        if (!sessionResponse.data || !sessionResponse.data.email) {
          console.error("No session found. Redirecting to login.");
          navigate("/login");
          return;
        }

        const userEmail = sessionResponse.data.email;

        // Fetch user data using the email from session
        const userResponse = await axios.get(
          `http://localhost:5001/Users/${userEmail}`
        );

        setUser(userResponse.data.user);
      } catch (err) {
        console.error("Error fetching session or user data:", err);
        setError("Failed to fetch user data.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center p-6 text-red-500">User data not available.</div>;
  }

  const handleeditbtn = () => {
    navigate("/UserProfileForm");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex">
        <div className="flex-1">
          <h2 className="text-xl font-semibold flex items-center">
            My details
            <button
              className="ml-2 text-blue-500 cursor-pointer"
              onClick={handleeditbtn}
            >
              ✎
            </button>
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mt-2">
              {user.firstname || "N/A"} {user.lastname || "N/A"}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-gray-600">Name</label>
              <div className="border p-2 rounded">
                {user.firstname || "N/A"} {user.lastname || "N/A"}
              </div>
            </div>
            <div>
              <label className="text-gray-600">Username</label>
              <div className="border p-2 rounded">{user.Username || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <div className="border p-2 rounded">{user.email || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Contact</label>
              <div className="border p-2 rounded">{user.Contract || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Nationality</label>
              <div className="border p-2 rounded">{user.Nationality || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Gender</label>
              <div className="border p-2 rounded">{user.Gender || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Address</label>
              <div className="border p-2 rounded">{user.address || "N/A"}</div>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-semibold">Passport details:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="text-gray-600">First Name</label>
              <div className="border p-2 rounded">{user.firstname || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Last Name</label>
              <div className="border p-2 rounded">{user.lastname || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Issuing Country</label>
              <div className="border p-2 rounded">{user.country || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Passport Number</label>
              <div className="border p-2 rounded">{user.passportnum || "N/A"}</div>
            </div>
            <div>
              <label className="text-gray-600">Expiration Date</label>
              <div className="border p-2 rounded">{user.expirationdate || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
