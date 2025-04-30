import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Register() {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          Password: formData.password, // Match backend key (case-sensitive)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      setMessage("User registered successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-blue-900 bg-opacity-90"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-96 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-center text-black">
            Create your account
          </h2>
          <p className="text-center text-black">Unlock all Features!</p>

          {message && (
            <p className="text-center text-red-500 font-semibold">{message}</p>
          )}

          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-black"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Surname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-black"
          />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-black"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-black"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-black"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" required className="mr-2" />
            <label htmlFor="terms" className="text-sm text-black">
              Accept{" "}
              <span className="text-black font-semibold">
                terms and conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>

          <p className="text-center text-black text-sm mt-2">
            You have an account?{" "}
            <span
              className="text-black font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
