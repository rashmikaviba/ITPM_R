import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTripStore } from "@/store/Trip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function CreatePage() {
  const [newTrip, setNewTrip] = useState({
    name: "",
    Date: "",
    destination: [],
  });

  const [tagInput, setTagInput] = useState("");

  const { createTrip } = useTripStore();

  const handleAddTrip = async () => {
    // Validation for empty fields
    if (!newTrip.name.trim()) {
      toast.error("Trip name is required.");
      return;
    }
    if (!newTrip.Date) {
      toast.error("Trip date is required.");
      return;
    }
    if (newTrip.destination.length === 0) {
      toast.error("At least one destination is required.");
      return;
    }

    const { success, message } = await createTrip(newTrip);

    if (success) {
      toast.success("Trip added successfully!");
      setNewTrip({ name: "", Date: "", destination: [] }); // Reset form
      setTagInput(""); // Reset tag input
    } else {
      toast.error(message || "Failed to add trip.");
    }
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!newTrip.destination.includes(tagInput.trim())) {
        setNewTrip({
          ...newTrip,
          destination: [...newTrip.destination, tagInput.trim()],
        });
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tag) => {
    setNewTrip({
      ...newTrip,
      destination: newTrip.destination.filter((t) => t !== tag),
    });
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
        {/* Left Section (Form) */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Create a New Trip
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Fill in the details below to add a new trip to your list.
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Trip Name
              </label>
              <Input
                id="name"
                placeholder="Enter trip name"
                name="name"
                value={newTrip.name}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, name: e.target.value })
                }
                className="mt-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="Date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <Input
                id="Date"
                placeholder="Select a date"
                name="Date"
                type="date"
                min={today} // Disable previous dates
                value={newTrip.Date}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, Date: e.target.value })
                }
                className="mt-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Destination
              </label>
              <div className="mt-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 flex flex-wrap gap-2 bg-white dark:bg-gray-700">
                {newTrip.destination.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} &times;
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add a destination and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="flex-grow bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Buttons Section */}
            <div className="space-y-4">
              <Button
                onClick={handleAddTrip}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
              >
                Add Trip
              </Button>

              <Button
                variant="ghost"
                asChild
                className="w-full text-blue-500 hover:text-blue-600"
              >
                <a href="/ViewTrip">View Trips</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Workspace"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default CreatePage;