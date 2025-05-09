import bcrypt from 'bcrypt'; 
import User from '../models/User.js'; // Import the User model

const UserController = {

  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email }); // Corrected logic to fetch a single user by email
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },
  getAllUserss: async (req, res) => {
    try {
      const users = await User.find(); // Corrected logic to fetch all users
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json({ users });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error fetching users", error: err.message });
    }
  },
  addUser: async (req, res) => {
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
  },
  loginUser: async (req, res) => {
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

      if (!req.session) { // Ensure session object exists
        req.session = {};
      }

      req.session.email = user.email; // Store user email in session

      return res.status(200).json({ message: "Login successful!", user });
    } catch (err) {
      console.error("Error during login:", err);
      return res
        .status(500)
        .json({ message: "Error during login", error: err.message });
    }
  },
  logoutUser: (req, res) => {
    // Handle user logout
    // Example: req.session.destroy();
    req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error logging out", error: err.message });
        }
        res.status(200).json({ message: "Logout successful!" });
      });
    res.status(200).json({ message: "User logged out successfully." });
  },
  updateUser: async (req, res) => {
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
    // Update user in database
    // Example: const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: `User with ID ${id} updated successfully.` });
  },
  deleteUser: async (req, res) => {
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
    res.status(200).json({ message: `User with ID ${id} deleted successfully.` });
  },
};

export default UserController;
