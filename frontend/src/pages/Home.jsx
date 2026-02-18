import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Toast from "../components/Toast";
import {
  Plus,
  FileQuestion,
  Activity,
  LayoutGrid,
  Calendar,
  ShieldCheck,
  Zap,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const fetchNotes = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/notes/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setAllNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserAndNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      try {
        const res = await fetch("http://localhost:5001/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("token");
          return navigate("/login");
        }
        const data = await res.json();
        setUserInfo(data);
        fetchNotes();
      } catch (err) {
        console.error(err);
        handleLogout();
      }
    };
    fetchUserAndNotes();
  }, [navigate, fetchNotes]);

  const filteredNotes = allNotes.filter((note) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = note.title.toLowerCase().includes(query);
    const matchesTags = note.tags?.some((tag) =>
      tag.toLowerCase().includes(query),
    );
    return matchesTitle || matchesTags;
  });

  const addNote = async (noteData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
      });
      if (res.ok) {
        showToastMessage("Note Added Successfully", "add");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const editNote = async (noteData) => {
    const noteId = openAddEditModal.data._id;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
      });
      if (res.ok) {
        showToastMessage("Note Updated Successfully", "add");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async (noteData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/notes/${noteData._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setAllNotes(allNotes.filter((n) => n._id !== noteData._id));
        showToastMessage("Note Deleted Successfully", "delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePin = async (noteData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/notes/${noteData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isPinned: !noteData.isPinned }),
        },
      );
      if (res.ok) {
        fetchNotes();
        showToastMessage(
          noteData.isPinned ? "Note Unpinned" : "Note Pinned",
          "add",
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (noteDetails) =>
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  const showToastMessage = (message, type) =>
    setShowToast({ isShown: true, message, type });
  const handleCloseToast = () => setShowToast({ isShown: false, message: "" });

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans text-slate-900">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-br from-emerald-100/40 to-cyan-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-gradient-to-tr from-green-100/40 to-blue-100/30 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`,
          }}
        />
      </div>

      <Navbar userInfo={userInfo} onLogout={handleLogout} />

      <main className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:col-span-3 lg:flex flex-col gap-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-600 rounded-xl text-white">
                  <Activity size={20} />
                </div>
                <h2 className="font-bold text-slate-800">System Status</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <LayoutGrid size={14} /> Total Notes
                  </span>
                  <span className="font-mono font-bold text-green-700">
                    {allNotes.length}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Zap size={14} /> Pinned Notes
                  </span>
                  <span className="font-mono font-bold text-amber-600">
                    {allNotes.filter((n) => n.isPinned).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-6 rounded-3xl shadow-lg text-white">
              <h3 className="text-sm font-semibold opacity-70 mb-1">
                Last Updated
              </h3>
              <p className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-emerald-400" />
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="text-[11px] leading-relaxed opacity-50 italic">
                Your notes are securely saved and protected by modern security
                standards.
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-[0.2em] mb-2">
                  Workspace
                </span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  Brain<span className="text-green-600">Canvas</span>
                </h1>
              </div>

              <div className="relative w-full md:w-[400px] group">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-green-500/20 via-emerald-400/20 to-green-500/20 rounded-[1.25rem] blur-md opacity-0 group-focus-within:opacity-100 transition-all duration-700 ease-out"></div>

                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10 pointer-events-none">
                    <Search
                      strokeWidth={2.5}
                      className="h-4.5 w-4.5 text-slate-400 group-focus-within:text-green-600 group-focus-within:rotate-[-5deg] transition-all duration-500"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Search Title or Tags"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-20 py-3.5 
                      bg-white/60 backdrop-blur-2xl 
                      border border-white/40 
                      rounded-3xl 
                      text-sm font-semibold tracking-tight
                      placeholder:text-slate-400/80 
                      focus:outline-none 
                      focus:bg-white/90
                      focus:border-green-500/50 
                      focus:ring-[5px] focus:ring-green-500/5 
                      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]
                      group-hover:shadow-lg group-hover:shadow-green-900/5
                      transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Content Area */}
            {filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-slate-200 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200 blur-3xl rounded-full opacity-20" />
                  <div className="bg-white shadow-2xl shadow-green-100 p-10 rounded-[2.5rem] mb-8 border border-green-50 relative">
                    <FileQuestion className="w-24 h-24 text-green-600/80 stroke-[1.5px]" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-3">
                  {searchQuery ? "No Matches Found" : "Initialize Repository"}
                </h3>
                <p className="text-slate-500 max-w-sm text-center font-medium leading-relaxed">
                  {searchQuery
                    ? `No entries found for "${searchQuery}". Try refining your search parameters.`
                    : "No data entries detected in the current scope. Start the sequence by creating your first note."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredNotes
                  .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
                  .map((note) => (
                    <div
                      key={note._id}
                      className="group transition-all duration-500 hover:-translate-y-2"
                    >
                      <NoteCard
                        note={note}
                        onEdit={() => handleEdit(note)}
                        onDelete={() => handleDelete(note)}
                        onPin={() => handlePin(note)}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <button
        className="fixed right-8 bottom-8 md:right-12 md:bottom-12 w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center text-white hover:bg-green-600 hover:rounded-2xl transition-all duration-500 z-40 group"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <Plus className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-180 transition-transform duration-700" />
      </button>

      {openAddEditModal.isShown && (
        <NoteForm
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          onSubmit={(data) => {
            if (openAddEditModal.type === "add") {
              addNote(data);
            } else {
              editNote(data);
            }
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      )}

      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
