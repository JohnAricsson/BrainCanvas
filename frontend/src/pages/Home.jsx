import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Toast from "../components/Toast";
import { Plus, FileQuestion } from "lucide-react";

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Alex Designer",
    email: "alex@braincanvas.com",
  });

  const [allNotes, setAllNotes] = useState([
    {
      id: 1,
      title: "Project Requirements",
      content:
        "1. Authentication\n2. Database Schema\n3. API Endpoints\nFinish backend by Friday!",
      tags: ["Dev", "Urgent"],
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Discussed UI design with team. Everyone liked dark mode idea.",
      tags: ["Work"],
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
  ]);

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

  const handleEdit = (noteDetails) =>
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });

  const handleDelete = (noteData) => {
    setAllNotes(allNotes.filter((n) => n.id !== noteData.id));
    showToastMessage("Note Deleted Successfully", "delete");
  };

  const handlePin = (noteData) => {
    const updatedNotes = allNotes.map((note) =>
      note.id === noteData.id ? { ...note, isPinned: !note.isPinned } : note
    );
    setAllNotes(updatedNotes);
    showToastMessage(
      !noteData.isPinned ? "Note Pinned" : "Note Unpinned",
      "add"
    );
  };

  const showToastMessage = (message, type) =>
    setShowToast({ isShown: true, message, type });

  const handleCloseToast = () => setShowToast({ isShown: false, message: "" });

  return (
    <>
      <Navbar userInfo={userInfo} onLogout={() => setUserInfo(null)} />

      {/* Add top padding to prevent navbar overlap */}
      <div className="container mx-auto px-4 sm:px-8 pt-28 pb-10">
        {/* Title + Description */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-800 mb-4 font-sans">
            Your Notes Dashboard
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto font-sans">
            Keep track of all your important notes, pinned items, and ideas.
            Click the add button to create a new note and start organizing your
            work efficiently.
          </p>
        </div>

        {/* Empty state */}
        {allNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="bg-green-100 p-6 rounded-full mb-4">
              <FileQuestion className="w-16 h-16 text-green-500 animate-bounce" />
            </div>
            <h3 className="text-3xl font-bold text-green-900 mb-2">
              No Notes Yet
            </h3>
            <p className="text-green-700 max-w-sm">
              Click the button below to create your first note and start your
              journey.
            </p>
          </div>
        ) : (
          // Notes Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNotes
              .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
              .map((note) => (
                <div
                  key={note.id}
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

      {/* Floating Add Button */}
      <button
        className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-40"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Add/Edit Modal */}
      {openAddEditModal.isShown && (
        <NoteForm
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          onSubmit={(data) => {
            if (openAddEditModal.type === "add") {
              setAllNotes([
                ...allNotes,
                {
                  ...data,
                  id: Date.now(),
                  isPinned: false,
                  createdAt: new Date(),
                },
              ]);
              showToastMessage("Note Added Successfully", "add");
            } else {
              const updated = allNotes.map((n) =>
                n.id === openAddEditModal.data.id ? { ...n, ...data } : n
              );
              setAllNotes(updated);
              showToastMessage("Note Updated Successfully", "add");
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
