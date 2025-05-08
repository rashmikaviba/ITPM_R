import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import TripsRoute from "./routes/Trips.route.js";
import userRouter from "./routes/userroute.js"; // ✅ Correct default import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust if your frontend runs on another port
    credentials: true,
  })
);

// Express session setup
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://isuruamac:BeE4463MktBZvqKR@cluster0.oydefln.mongodb.net/Trips?retryWrites=true&w=majority",
      ttl: 3 * 30 * 24 * 60 * 60, // 3 months
      autoRemove: "native",
    }),
    cookie: {
      secure: false, // Change to true if using HTTPS
      httpOnly: true,
      maxAge: 3 * 30 * 24 * 60 * 60 * 1000, // 3 months in ms
    },
  })
);

// Routes
app.use("/api/Trips", TripsRoute);
app.use("/users", userRouter); // ✅ Fixed import

// Check session route
app.get("/session", (req, res) => {
  if (!req.session.email) {
    return res.status(401).json({ message: "No active session" });
  }
  res.status(200).json({ email: req.session.email });
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://isuruamac:BeE4463MktBZvqKR@cluster0.oydefln.mongodb.net/Trips?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit the process if DB connection fails
  });
