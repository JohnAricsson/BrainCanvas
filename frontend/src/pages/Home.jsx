import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Toast from "../components/Toast";
import { Plus, FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // User info state
  const [userInfo, setUserInfo] = useState(null);
  // Notes state
  const [allNotes, setAllNotes] = useState([]);

  // Modal & Toast state
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

  // 1. Standardized Fetch Notes function
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate("/login");
  };

  // 2. Load User Info AND Notes on mount
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

        // After user is verified, get their notes
        fetchNotes();
      } catch (err) {
        console.error(err);
        handleLogout();
      }
    };

    fetchUserAndNotes();
  }, [navigate, fetchNotes]);

  // 3. API Actions
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
        fetchNotes(); // Reload from server
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
      // Updated: Send the toggled pin state to the PUT route
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
    <>
      <Navbar userInfo={userInfo} onLogout={handleLogout} />

      <div className="container mx-auto px-4 sm:px-8 pt-28 pb-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-800 mb-4 font-sans">
            Your Notes Dashboard
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto font-sans">
            Keep track of all your important notes and ideas.
          </p>
        </div>

        {allNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="bg-green-100 p-6 rounded-full mb-4">
              <FileQuestion className="w-16 h-16 text-green-500 animate-bounce" />
            </div>
            <h3 className="text-3xl font-bold text-green-900 mb-2">
              No Notes Yet
            </h3>
            <p className="text-green-700 max-w-sm">
              Click the + button to start.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNotes
              .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
              .map((note) => (
                <div
                  key={note._id}
                  className="bg-green-50 shadow-md rounded-xl p-4 transition-transform hover:scale-[1.02]"
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

      <button
        className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-40"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <Plus className="w-8 h-8" />
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
    </>
  );
};

export default Home;
