import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // This should be here as an option for the schema
});

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
