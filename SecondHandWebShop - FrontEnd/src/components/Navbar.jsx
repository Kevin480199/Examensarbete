import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { jwt, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(jwt);
  const [toast, setToast] = useState(null);

  function handleLogout() {
    logout();        // clears JWT, etc.
    setToast({ message: "Log out successfully!", type: "success" });
        setTimeout(() => {
        navigate("/");
        }, 1200);
  }

  return (
    <nav className="h-16 bg-gray-900/80 backdrop-blur-md text-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-lg">
      
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/" className="hover:text-blue-400 transition">SecondHand</Link>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <Link 
          to="/" 
          className="text-white hover:text-blue-400 transition font-medium"
        >
          Home
        </Link>

        {isLoggedIn && (
          <>
            <Link 
              to="/add" 
              className="text-white hover:text-blue-400 transition font-medium"
            >
              Add Listing
            </Link>
            <Link 
              to="/my-listings" 
              className="text-white hover:text-blue-400 transition font-medium"
            >
              My Listings
            </Link>
          </>
        )}
      </div>

      {/* Auth Controls */}
      <div>
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="px-4 py-1.5 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition font-medium"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 border border-red-400 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
