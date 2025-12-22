import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  NotebookPen,
  LogIn,
  Shield,
} from "lucide-react";
import Navbar from "../components/Navbar";
import backgroundImg from "../assets/LoginBackground.jpg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup:", name, email, password);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-10 border border-white/30 relative z-10 transform transition-all duration-300 hover:scale-[1.02]">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <NotebookPen className="w-7 h-7 text-green-900 mb-3" />
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              BrainCanvas
            </h2>
            <p className="text-green-900 text-center">
              Create an account to start your journey with BrainCanvas
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name */}
            <div className="relative flex items-center">
              <label className="flex items-center mb-2 text-green-900 absolute -top-6 left-0">
                <NotebookPen className="mr-2 text-green-900" /> Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <NotebookPen className="absolute left-4 inset-y-0 my-auto text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative flex items-center">
              <label className="flex items-center mb-2 text-gray-700 absolute -top-6 left-0">
                <Mail className="mr-2 text-green-900" /> Email Address
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute left-4 inset-y-0 my-auto text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <label className="flex items-center mb-2 text-green-900 absolute -top-6 left-0">
                <Lock className="mr-2 text-green-900" /> Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-4 inset-y-0 my-auto text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 inset-y-0 my-auto text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative flex items-center">
              <label className="flex items-center mb-2 text-green-900 absolute -top-6 left-0">
                <Lock className="mr-2 text-green-900" /> Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Lock className="absolute left-4 inset-y-0 my-auto text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 inset-y-0 my-auto text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center animate-shake">
                <Shield className="mr-2" /> {error}
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <>
                  <LogIn className="mr-2 group-hover:animate-bounce" /> Sign Up
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="mx-4 text-sm text-gray-500">
                or continue with
              </span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button className="flex items-center justify-center py-3 bg-blue-600 border border-blue-700 rounded-xl hover:bg-blue-700 text-white">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12z" />
                </svg>
                Facebook
              </button>

              <button className="flex items-center justify-center py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-300 text-gray-800">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-17.9-1.6-35.2-4.6-52H272v98.9h146.9c-6.4 34.7-25.7 64.1-54.9 83.9v69.7h88.7c51.9-47.9 81.8-118.3 81.8-200.5z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272 544.3c73.6 0 135.4-24.3 180.5-65.9l-88.7-69.7c-24.7 16.6-56.3 26.5-91.8 26.5-70.8 0-130.7-47.7-152.1-111.8H28.2v70.5C73.3 473.7 165 544.3 272 544.3z"
                    fill="#34A853"
                  />
                  <path
                    d="M119.9 325.9c-8.2-24.7-8.2-51.4 0-76.1V179.3H28.2c-18.7 37.6-29.5 79.9-29.5 124.5s10.8 86.9 29.5 124.5l91.7-70.4z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M272 107.1c38.8 0 73.6 13.3 101 39.4l75.8-75.8C407.4 24.3 345.6 0 272 0 165 0 73.3 70.6 28.2 179.3l91.7 70.5C141.3 154.8 201.2 107.1 272 107.1z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-900 font-semibold hover:text-blue-800 transition-colors group inline-flex items-center"
                >
                  Login
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform ml-1">
                    →
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
