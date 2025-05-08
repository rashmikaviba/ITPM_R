import express from "express";
import * as UserController from "../contollers/usercontroller.js";

const router = express.Router();

// User routes
router.get("/:email", UserController.getUserByEmail);
router.get("/", UserController.getAllUsers);
router.post("/register", UserController.addUser);
router.post("/login", UserController.loginUser); // Login route
router.post("/logout", UserController.logoutUser); // Logout route
router.put("/:email", UserController.updateUser);
router.delete("/:email", UserController.deleteUser);

export default router;
