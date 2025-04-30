import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const navigate = useNavigate();

  // State variable for user data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    nationality: "",
    gender: "",
    address: "",
    passportFirstName: "",
    passportLastName: "",
    issuingCountry: "",
    passportNumber: "",
    expirationDate: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the session email
        const sessionResponse = await axios.get(
          "http://localhost:5001/session",
          {
            withCredentials: true,
          }
        );

        if (!sessionResponse.data.email) {
          alert("User not logged in!");
          return;
        }

        const userEmail = sessionResponse.data.email;

        // Fetch the user's current data
        const userResponse = await axios.get(
          `http://localhost:5001/users/${userEmail}`,
          {
            withCredentials: true,
          }
        );

        const userData = userResponse.data.user;

        // Autofill form data with fetched user data
        setFormData({
          name: `${userData.firstname || ""} ${userData.lastname || ""}`.trim(),
          username: userData.Username || "",
          email: userData.email || "",
          contact: userData.Contract || "",
          nationality: userData.Nationality || "",
          gender: userData.Gender || "",
          address: userData.address || "",
          passportFirstName: userData.passportFirstName || "",
          passportLastName: userData.passportLastName || "",
          issuingCountry: userData.issuingCountry || "",
          passportNumber: userData.passportNumber || "",
          expirationDate: userData.expirationDate || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  // Handle form input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "name" || name === "nationality" || name === "gender") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Allow only letters and spaces
    } else if (name === "contact") {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sessionResponse = await axios.get("http://localhost:5001/session", {
        withCredentials: true,
      });

      if (!sessionResponse.data.email) {
        alert("User not logged in!");
        return;
      }

      const userEmail = sessionResponse.data.email;

      // Split name into firstname and lastname safely
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Prepare data to update
      const dataToUpdate = {
        firstname: firstName,
        lastname: lastName,
        Username: formData.username,
        Contract: formData.contact,
        Nationality: formData.nationality,
        Gender: formData.gender,
        address: formData.address,
        passportFirstName: formData.passportFirstName,
        passportLastName: formData.passportLastName,
        issuingCountry: formData.issuingCountry,
        passportNumber: formData.passportNumber,
        expirationDate: formData.expirationDate,
      };

      const response = await axios.put(
        `http://localhost:5000/users/${userEmail}`,
        dataToUpdate,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate("/Profile");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-4">Edit My Details</h2>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                value={formData.email}
                name="email"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contact</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.contact}
                name="contact"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nationality</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.nationality}
                name="nationality"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.gender}
                name="gender"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Address</label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={formData.address}
                name="address"
                onChange={handleChange}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-6">Passport Details:</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.passportFirstName}
                name="passportFirstName"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.passportLastName}
                name="passportLastName"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Issuing Country
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.issuingCountry}
                name="issuingCountry"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Passport Number
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.passportNumber}
                name="passportNumber"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/Profile")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Submit Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
