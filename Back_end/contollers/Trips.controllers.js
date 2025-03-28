import Trip from "../models/Trip.models.js";
import mongoose from "mongoose";

export const getTrips = async (req, res) => {
    try {
      const trips = await Trip.find();
      res.status(200).json({ success: true, data: trips });
    } catch (error) {
      console.error("Error fetching trips:", error.message);
      res.status(500).json({ success: false, message: "Error fetching trips" });
    }
  }

  export const createTrip = async (req, res) => {
      const { name, Date, destination } = req.body;
    
      if (!name || !Date || !destination) {
        return res.status(400).json({ message: "Please provide all the required fields" });
      }
    
      const trip = new Trip({ name, Date, destination });
    
      try {
        await trip.save();
        res.status(201).json({ success: true, data: trip });
      } catch (error) {
        console.error("Error saving trip:", error.message);
        res.status(500).json({ success: false, message: "Error saving trip" });
      }
    }
//////////////////////////////


export const updateTrip = async (req, res) => {
    const { id } = req.params;
    let tripData = req.body;  // Rename to avoid conflict with model name
  
    // Ensure Date is a valid date object
    if (tripData.Date) {
      tripData.Date = new Date(tripData.Date);
    }
  
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
  
    try {
      // Use findByIdAndUpdate to update the trip
      const updatedTrip = await Trip.findByIdAndUpdate(id, tripData, { new: true });
  
      if (!updatedTrip) {
        return res.status(404).json({ success: false, message: "Trip not found" });
      }
  
      res.status(200).json({ success: true, data: updatedTrip });
    } catch (error) {
      console.error("Error updating trip:", error.message);
      res.status(500).json({ success: false, message: "Error updating trip" });
    }
  };

      //////////////////////////////

      export const deleteTrip = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
          }
          
      try {
        await Trip.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Trip deleted successfully" });
      } catch (error) {
        console.error("Error deleting trip:", error.message);
        res.status(500).json({ success: false, message: "save Error" });
      }
      }