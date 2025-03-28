import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/store/Trip";
import { toast } from "react-toastify";

const TripCard = ({ trip }) => {
  const { deleteTrip, updateTrip } = useTripStore(); // Include updateTrip from the store
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // State for confirmation modal
  const [formData, setFormData] = useState({
    name: trip.name,
    destination: trip.destination,
    Date: trip.Date,
  }); // State for form data

  const handleDeleteTrip = async () => {
    if (!trip._id) {
      toast.error("Trip ID is missing.");
      return;
    }

    const { success, message } = await deleteTrip(trip._id);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setIsConfirmDeleteOpen(false); // Close the confirmation modal after deletion
  };

  const handleEditTrip = async (e) => {
    e.preventDefault();

    const { success, message } = await updateTrip(trip._id, formData);

    if (success) {
      toast.success("Trip updated successfully!");
      setIsModalOpen(false); // Close the modal
    } else {
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xs mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <img
        className="w-full h-56 object-cover"
        src="https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Trip"
      />

      {/* Trip Info Section */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {trip.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{trip.destination}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{trip.Date}</p>

        <div className="flex justify-between items-center mt-4 space-x-2">
          {/* Delete Button */}
          <Button onClick={() => setIsConfirmDeleteOpen(true)}>Delete</Button>

          {/* Edit Button */}
          <Button onClick={() => setIsModalOpen(true)}>Edit Trip</Button>
        </div>
      </div>

      {/* Modal for Editing Trip */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Edit Trip
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditTrip}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="destination"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="Date"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  value={formData.Date.split("T")[0]} // Format date for input
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Are you sure you want to delete this trip?
            </h2>
            <div className="flex justify-between">
              <Button
                onClick={handleDeleteTrip}
                className="w-1/3 bg-red-500 text-white rounded-lg"
              >
                Yes
              </Button>
              <Button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="w-1/3 bg-gray-300 text-gray-800 rounded-lg"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;
