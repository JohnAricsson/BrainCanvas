import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";
//DaisyUI for tailwind css library npm i -D daisyui@latest
const App = () => {
  return (
    <div>
      <button className="btn btn-primary">Works</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
