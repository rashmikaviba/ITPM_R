import express from "express";
import MongoStore from "connect-mongo"; // Changed from require to import
import session from "express-session"; // Changed from require to import
import dotenv from "dotenv";
import cors from "cors"; // Import the cors package
import { connectDB } from "./Config/db.js";
import TripsRoute from "./routes/Trips.route.js";
import { router } from "./routes/userroute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
      process.env.MONGO_URL,
      ttl: 3 * 30 * 24 * 60 * 60, // ✅ 3 months (in seconds)
      autoRemove: "native", // Automatically remove expired sessions
    }),
    cookie: {
      secure: false, // Change to true if using HTTPS
      httpOnly: true,
      maxAge: 3 * 30 * 24 * 60 * 60 * 1000, // ✅ 3 months in milliseconds
    },
  })
);

app.get("/session", (req, res) => {
  if (!req.session || !req.session.email) { // Ensure session object exists
    return res.status(401).json({ message: "No active session" });
  }
  res.status(200).json({ email: req.session.email });
});

app.use("/api/Trips", TripsRoute);
app.use("/users", router);

// Start the server
app.listen(5001, () => {
  connectDB();
  console.log("Server started at http://localhost:"+ PORT);
});

