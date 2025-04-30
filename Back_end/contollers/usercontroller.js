const User = require("../models/usermodels.js");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Initialize session middleware (should be added in server.js)
const sessionMiddleware = session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if using HTTPS
});

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Add a new user (with hashed password)
const addUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    Username,
    Password,
    Contract,
    Nationality,
    Gender,
    address,
  } = req.body;

  try {
    if (!Password || typeof Password !== "string") {
      return res
        .status(400)
        .json({ message: "Password must be a valid string" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      Username,
      Password: hashedPassword, // Store hashed password
      Contract,
      Nationality,
      Gender,
      address,
    });

    await user.save();
    return res.status(201).json({ message: "User added successfully!", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add user", error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Store user email in session
    req.session.email = user.email;

    // ✅ Send response with session data
    return res.status(200).json({ message: "Login successful!", user });
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ message: "Error during login", error: err.message });
  }
};

// Logout function
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error logging out", error: err.message });
    }
    res.status(200).json({ message: "Logout successful!" });
  });
};

// Update user by email
const updateUser = async (req, res) => {
  const { email } = req.params;
  const {
    firstname,
    lastname,
    Username,
    Password,
    Contract,
    Nationality,
    Gender,
    address,
  } = req.body;

  let updatedData = {
    firstname,
    lastname,
    Username,
    Contract,
    Nationality,
    Gender,
    address,
  };

  // If Password is provided, hash it before updating
  if (Password) {
    updatedData.Password = await bcrypt.hash(Password, 10);
  }

  try {
    const user = await User.findOneAndUpdate({ email }, updatedData, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully!", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Delete user by email
const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

// Export functions
exports.getAllUsers = getAllUsers;
exports.getUserByEmail = getUserByEmail;
exports.addUser = addUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.sessionMiddleware = sessionMiddleware;
