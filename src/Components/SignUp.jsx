import { Link } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "./Firebase"; // Import correctly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    lifestyle: "",
    conditions: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name || "N/A",
          email: formData.email,
          age: formData.age ? Number(formData.age) : 0,
          gender: formData.gender || "Unspecified",
          weight: formData.weight ? Number(formData.weight) : 0,
          height: formData.height ? Number(formData.height) : 0,
          lifestyle: formData.lifestyle || "Unspecified",
          conditions: formData.conditions
            ? formData.conditions.split(",").map((c) => c.trim())
            : [],
          healthData: {},
        });

        alert("User registered successfully!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />

          <select name="gender" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />
          <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />

          <select name="lifestyle" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300">
            <option value="">Select Lifestyle</option>
            <option value="active">Active</option>
            <option value="sedentary">Sedentary</option>
          </select>

          <input type="text" name="conditions" placeholder="Existing Medical Conditions (comma-separated)" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300" />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Sign Up
          </button>

          <p className="text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
