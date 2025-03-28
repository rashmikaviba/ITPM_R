import express from "express";

import { getTrips, createTrip, updateTrip, deleteTrip } from "../contollers/Trips.controllers.js";


const router = express.Router();


router.get("/",getTrips);
router.post("/",createTrip);
router.put("/:id",updateTrip);
router.delete("/:id", deleteTrip);


export default router;