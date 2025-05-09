import { FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/users/login", // ✅ fixed lowercase `users`
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful! Redirecting to profile...");
        setErrorMessage("");

        setTimeout(() => {
          navigate("/Profile");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setSuccessMessage("");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleCreateAccount = () => {
    navigate("/Register");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-blue-900 bg-opacity-90"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-96 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-black text-center">
          Login to your Account
        </h2>
        <p className="text-sm text-black text-center">
          Welcome back! Select method to log in:
        </p>

        <button
          className="flex items-center justify-center w-full mt-4 p-2 border border-black rounded-lg text-black hover:bg-black hover:text-white transition"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="mr-2" /> Login with Google
        </button>

        <div className="text-center text-black my-4">
          or continue with email
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg mt-4"
          >
            LOGIN
          </button>
        </form>

        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="text-green-500 text-center mt-2">
            {successMessage}
          </div>
        )}

        <div className="flex justify-between items-center mt-3 text-black">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <button
            type="button"
            className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={() => alert("Forgot Password clicked")}
          >
            Forgot Password?
          </button>
        </div>

        <p className="text-center text-black mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={handleCreateAccount}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
