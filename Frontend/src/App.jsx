import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject"; 

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Project Pages */}
            <Route path="/add-project" element={<AddProject />} />
            <Route
              path="/project/:projectId/edit-project"
              element={<EditProject />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;