import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
