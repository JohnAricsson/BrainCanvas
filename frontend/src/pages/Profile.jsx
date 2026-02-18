import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Save,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Edit2,
  X,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return navigate("/login");
      try {
        const { data } = await axios.get("http://localhost:5001/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = { name: data.name, email: data.email, password: "" };
        setForm(userData);
        setInitialData(userData);
        setUserInfo(data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message.type === "error") setMessage({ text: "", type: "" });
  };

  const handleCancel = () => {
    setForm(initialData);
    setIsEditing(false);
    setMessage({ text: "", type: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setMessage({ text: "Name and Email cannot be empty.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.put("http://localhost:5001/api/user/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ text: "Profile updated successfully!", type: "success" });
      setInitialData(form);
      setIsEditing(false);
      setForm({ ...form, password: "" });
      setUserInfo({ ...userInfo, name: form.name, email: form.email });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Update failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <Navbar userInfo={userInfo} onLogout={handleLogout} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-100/40 via-slate-100/20 to-slate-50 -z-10"></div>

      <main className="container mx-auto pt-28 pb-12 px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-slate-500 hover:text-green-700 transition-colors mb-8 font-medium"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Dashboard
        </button>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-white p-8 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-green-600 to-emerald-600 opacity-10"></div>

              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-600 to-emerald-800 text-white flex items-center justify-center text-4xl font-bold shadow-2xl shadow-green-700/30 mb-6 relative z-10 border-4 border-white">
                {getInitials(initialData.name)}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {initialData.name}
              </h3>
              <p className="text-slate-500 font-medium mb-6">
                {initialData.email}
              </p>

              <div className="w-full pt-6 border-t border-slate-100">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50/80 px-4 py-2 rounded-full uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  Verified BrainCanvas User
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-white p-8 md:p-10 relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
                    Account Settings
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Manage your personal information and security preferences.
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl transition-all"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>

              {message.text && (
                <div
                  className={`mb-8 flex items-start gap-3 px-4 py-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
                    message.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  )}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-green-600" : "text-slate-400"}`}
                        size={20}
                      />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border bg-slate-50/50 outline-none transition-all font-medium
                          ${
                            isEditing
                              ? "border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 bg-white shadow-sm"
                              : "border-transparent text-slate-600 cursor-not-allowed opacity-75"
                          }`}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-green-600" : "text-slate-400"}`}
                        size={20}
                      />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border bg-slate-50/50 outline-none transition-all font-medium
                          ${
                            isEditing
                              ? "border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 bg-white shadow-sm"
                              : "border-transparent text-slate-600 cursor-not-allowed opacity-75"
                          }`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      {isEditing ? "Change Password" : "Password"}
                    </label>
                    <div className="relative group">
                      <Lock
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-green-600" : "text-slate-400"}`}
                        size={20}
                      />
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border bg-slate-50/50 outline-none transition-all font-medium
                          ${
                            isEditing
                              ? "border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 bg-white shadow-sm"
                              : "border-transparent text-slate-600 cursor-not-allowed opacity-75"
                          }`}
                        placeholder={
                          isEditing
                            ? "New password (leave blank to keep current)"
                            : "••••••••••••"
                        }
                      />
                    </div>
                    {isEditing && (
                      <p className="text-xs text-slate-400 font-medium ml-4 flex items-center gap-1">
                        <ShieldCheck size={12} /> Only enter a password if you
                        want to change it.
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                    >
                      <X size={18} /> Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-green-600/20 transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:shadow-none"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save size={18} />
                      )}
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
