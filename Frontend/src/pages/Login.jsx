import React, { useState } from "react";
import { loginUser } from "../api/api"; // Import your login API function
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "User", // Default role
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update the corresponding field in formData
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Clear previous error message
    console.log(formData);

    // Simple validation
    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required.");
      return; // Exit if validation fails
    }

    console.log("Form data being submitted:", formData); // Log form data for debugging

    try {
      const { data } = await loginUser(formData); // Make API call to log in
      localStorage.setItem("token", data.token); // Store the token in local storage

      navigate("/dashboard"); // Navigate to the dashboard
    } catch (error) {
      console.error("Login failed", error); // Log error details
      setErrorMessage("Login failed. Please check your credentials."); // Set error message for display
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl mb-4">Login</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email" // Input field for email
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange} // Update formData on change
          className="border p-2 rounded"
        />
        <input
          name="password" // Input field for password
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange} // Update formData on change
          className="border p-2 rounded"
        />
        <select
          name="role" // Dropdown for selecting role
          value={formData.role}
          onChange={handleChange} // Update formData on change
          className="border p-2 rounded"
        >
          <option value="User">User</option>
          <option value="BusinessPeople">BusinessPeople</option>
          <option value="Investor">Investor</option>
          <option value="Banker">Banker</option>
          <option value="BusinessAdvisor">BusinessAdvisor</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
