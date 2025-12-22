import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotebookPen, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    let initials = names[0][0].toUpperCase();
    if (names.length > 1) initials += names[names.length - 1][0].toUpperCase();
    return initials;
  };

  return (
    <nav className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white fixed w-full z-20 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Left */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold"
          >
            <NotebookPen className="w-8 h-8 text-white" />
            <span>BrainCanvas</span>
          </Link>

          {/* Desktop Links Right */}
          <div className="hidden md:flex items-center gap-6 text-lg font-medium">
            {userInfo ? (
              <>
                <span className="font-semibold">{userInfo.name}</span>
                <div className="bg-yellow-300 text-black w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                  {getInitials(userInfo.name)}
                </div>
                <button
                  onClick={handleLogout}
                  className="hover:bg-white hover:text-blue-500 px-3 py-1 rounded transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white px-4 py-4 space-y-2">
          {userInfo ? (
            <>
              <div className="flex items-center gap-2 text-lg font-medium">
                <div className="bg-yellow-300 text-black w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                  {getInitials(userInfo.name)}
                </div>
                <span>{userInfo.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left hover:bg-blue-600 px-3 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-lg hover:bg-blue-600 px-3 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block bg-yellow-300 text-black px-3 py-2 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
