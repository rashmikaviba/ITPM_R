import express from "express";
import { getUser, createUser } from "../controllers/usercontroller.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);

export { router };
