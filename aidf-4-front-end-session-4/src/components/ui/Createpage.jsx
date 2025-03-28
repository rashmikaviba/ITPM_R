import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTripStore } from "@/store/Trip";
import { toast } from "react-toastify";

function CreatePage() {
  const [newTrip, setNewTrip] = useState({
    name: "",
    Date: "",
    destination: "",
  });

  const { createTrip } = useTripStore();

  const handleAddTrip = async () => {
    if (!newTrip.name || !newTrip.Date || !newTrip.destination) {
      toast.error("Please fill in all fields.");
      return;
    }

    const { success, message } = await createTrip(newTrip);

    if (success) {
      toast.success("Trip added successfully!");
      setNewTrip({ name: "", Date: "", destination: "" }); // Reset form
    } else {
      toast.error(message || "Failed to add trip.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
        {/* Left Section (Form) */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-8"> {/* Add margin-right for space */}
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
              <Input
                id="destination"
                placeholder="Enter destination"
                name="destination"
                value={newTrip.destination}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, destination: e.target.value })
                }
                className="mt-2 w-full"
              />
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
    </div>
  );
}

export default CreatePage;
