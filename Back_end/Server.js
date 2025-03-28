import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import TripsRoute from "./routes/Trips.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/Trips", TripsRoute);


// Start the server
app.listen(5001, () => {
  connectDB();
  console.log("Server started at http://localhost:"+ PORT);
});

