import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "./Firebase"; // Import correctly
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // To redirect after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before trying login

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in:", userCredential.user);

      alert("Login successful!");
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Login error:", error.message);
      
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Login
          </button>

          <p className="text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-green-600 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
