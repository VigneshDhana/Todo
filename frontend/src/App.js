import React from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/signinAndRegister/landing";
import Todo from "./components/todo/todo";

function App() {
  const [user, setUser] = useState({});
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing setUser={setUser} />} />
        <Route path="/todo" element={<Todo user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
