import express from "express";
const router = express.Router();
import UserController from "../controllers/usercontroller.js"; // Corrected path to the controllers file

// User routes
router.get("/:email", UserController.getUserByEmail);
router.get("/", UserController.getAllUserss);
router.post("/", UserController.addUser);
router.post("/login", UserController.loginUser); // Login route
router.post("/logout", UserController.logoutUser); // Logout route
router.put("/:email", UserController.updateUser);
router.delete("/:email", UserController.deleteUser);

export { router }; // Ensure router is exported as a named export
