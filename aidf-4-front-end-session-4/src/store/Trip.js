import { create } from "zustand";


export const useTripStore = create((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  createTrip: async (newTrip) => {
    // Validate the newTrip data
    if (!newTrip.name || !newTrip.Date || !newTrip.destination) {
      return { success: false, message: "Please fill all the fields" };
    }
    

    try {
      // Make the API request to create a new trip
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrip),
      });

      // Check for a successful response
      if (!res.ok) {
        throw new Error("Failed to create the trip");
      }

      const data = await res.json();
      // Update the state with the new trip
      set((state) => ({ trips: [...state.trips, data.data] }));
      return { success: true, message: "Trip created successfully" };

    } catch (error) {
      // Error handling
      return { success: false, message: error.message || "Error creating trip" };
    }
  },

  fetchTrips: async () => {
    try {
      const res = await fetch("/api/trips");
      const data = await res.json();
      set({ trips: data.data });
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  },


  deleteTrip: async (id) => {
    try {
      const res = await fetch(`/api/trips/${id}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        return { success: false, message: data.message || "Failed to delete trip" };
      }
  
      // Update the state to remove the deleted trip
      set((state) => ({
        trips: state.trips.filter((trip) => trip._id !== id),
      }));
  
      return { success: true, message: "Trip deleted successfully" };
    } catch (error) {
      console.error("Error deleting trip:", error);
      return { success: false, message: "Error deleting trip" };
    }
  },

   updateTrip: async (id, updatedTrip) => {
    const res = await fetch(`/api/trips/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrip),
    });
    const data = await res.json();
    if(!data.success)return { success: false, message: data.message || "Failed to update trip" };
    set((state) => ({
        trips: state.trips.map((trip) => trip._id === id ? updatedTrip : trip),
      }));
    }
}));
