import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { auth, db } from "./Firebase"; // Ensure correct path
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: currentUser.uid, ...userDoc.data() });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <FaUserMd className="text-green-600 text-3xl mr-2" />
            <span className="text-xl font-bold text-gray-800">AI Health Assistant</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 font-medium">Contact</Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-green-600 text-3xl" />
                <span className="text-gray-800 font-medium">{user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="text-red-600 border border-red-600 px-4 py-1 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-green-600 border border-green-600 px-4 py-1 rounded-lg hover:bg-green-600 hover:text-white transition">
                  Login
                </Link>
                <Link to="/signup" className="text-green-600 border border-green-600 px-4 py-1 rounded-lg hover:bg-green-600 hover:text-white transition">
                  SignUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-green-100" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="block py-2 px-4 text-gray-700 hover:bg-green-100" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="block py-2 px-4 text-gray-700 hover:bg-green-100" onClick={() => setIsOpen(false)}>Contact</Link>
          <div className="py-2 px-4">
            {user ? (
              <div className="text-center">
                <FaUserCircle className="text-green-600 text-3xl mx-auto mb-2" />
                <p className="text-gray-800 font-medium">{user.name}</p>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-red-600 border border-red-600 py-1 rounded-lg hover:bg-red-600 hover:text-white transition mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="block w-full text-center text-green-600 border border-green-600 py-1 rounded-lg hover:bg-green-600 hover:text-white transition">
                  Login
                </Link>
                <Link to="/signup" className="block w-full text-center text-green-600 border border-green-600 py-1 rounded-lg hover:bg-green-600 hover:text-white transition mt-2">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
