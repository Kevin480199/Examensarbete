import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { jwt, logout, user } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(jwt);
  const [toast, setToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setToast({ message: "Log out successfully!", type: "success" });
    setTimeout(() => navigate("/"), 1200);
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="h-16 bg-gray-900/80 backdrop-blur-md text-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-lg">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-blue-400 transition">
            SecondHand
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition font-medium">
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link to="/add" className="hover:text-blue-400 transition font-medium">
                Add Listing
              </Link>

              <Link to="/my-listings" className="hover:text-blue-400 transition font-medium">
                My Listings
              </Link>

              <Link to="/favorites" className="hover:text-blue-400 transition font-medium">
                Favorites
              </Link>

              <Link to="/recommendations" className="hover:text-blue-400 transition font-medium">
                Recommendations
              </Link>
              {user?.admin === "admin" && <Link to="/adminpage" className="hover:text-blue-400 transition font-medium">
                Admin page
              </Link> }
            </>
          )}
        </div>

        {/* AUTH BUTTONS DESKTOP */}
        <div className="hidden md:flex">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-4 py-1.5 border border-blue-400 text-blue-400 rounded-lg 
                         hover:bg-blue-500 hover:text-white transition font-medium"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 border border-red-400 text-red-400 rounded-lg 
                         hover:bg-red-500 hover:text-white transition font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ⬇ MOBILE DROPDOWN MENU ⬇ */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-3 shadow-lg animate-slideDown">
          <Link
            to="/"
            className="block hover:text-blue-400 transition font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/add"
                className="block hover:text-blue-400 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Add Listing
              </Link>

              <Link
                to="/my-listings"
                className="block hover:text-blue-400 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                My Listings
              </Link>

              <Link
                to="/favorites"
                className="block hover:text-blue-400 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Favorites
              </Link>

              <Link
                to="/recommendations"
                className="block hover:text-blue-400 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Recommendations
              </Link>

              {user?.admin === "admin" && (
                <Link
                    to="/adminpage"
                    className="block hover:text-blue-400 transition font-medium"
                    onClick={() => setMenuOpen(false)}
                >
                    Admin Page
                </Link>
                )}

            </>
          )}

          {/* MOBILE AUTH BUTTON */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="block w-full px-4 py-2 text-center border border-blue-400 text-blue-400 rounded-lg 
                         hover:bg-blue-500 hover:text-white transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 border border-red-400 text-red-400 rounded-lg 
                         hover:bg-red-500 hover:text-white transition font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
}
