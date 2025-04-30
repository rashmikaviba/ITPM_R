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
        // Fetch session details
        const sessionResponse = await axios.get(
          "http://localhost:5001/session",
          { withCredentials: true }
        );

        if (!sessionResponse.data.email) {
          setError("No user session found. Please log in.");
          setLoading(false);
          return;
        }

        const userEmail = sessionResponse.data.email;

        // Fetch user data using email
        const userResponse = await axios.get(
          `http://localhost:5001/Users/${userEmail}`
        );
        setUser(userResponse.data.user);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  const handleeditbtn = async () => {
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
            <h3 className="text-lg font-semibold mt-2">Vinuja Hansindu</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-gray-600">Name</label>
              <div className="border p-2 rounded">
                {user.firstname} {user.lastname}
              </div>
            </div>
            <div>
              <label className="text-gray-600">Username</label>
              <div className="border p-2 rounded">{user.Username}</div>
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <div className="border p-2 rounded">{user.email}</div>
            </div>
            <div>
              <label className="text-gray-600">Contact</label>
              <div className="border p-2 rounded">{user.Contract}</div>
            </div>
            <div>
              <label className="text-gray-600">Nationality</label>
              <div className="border p-2 rounded">{user.Nationality}</div>
            </div>
            <div>
              <label className="text-gray-600">Gender</label>
              <div className="border p-2 rounded">{user.Gender}</div>
            </div>
            <div>
              <label className="text-gray-600">Address</label>
              <div className="border p-2 rounded">{user.address}</div>
            </div>
          </div>
          <h3 className="mt-6 text-lg font-semibold">Passport details:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="text-gray-600">First Name</label>
              <div className="border p-2 rounded">{user.firstname}</div>
            </div>
            <div>
              <label className="text-gray-600">Last Name</label>
              <div className="border p-2 rounded">{user.lastname}</div>
            </div>
            <div>
              <label className="text-gray-600">Issuing Country</label>
              <div className="border p-2 rounded">{user.country}</div>
            </div>
            <div>
              <label className="text-gray-600">Passport Number</label>
              <div className="border p-2 rounded">{user.passportnum}</div>
            </div>
            <div>
              <label className="text-gray-600">Expiration Date</label>
              <div className="border p-2 rounded">{user.expirationdate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
