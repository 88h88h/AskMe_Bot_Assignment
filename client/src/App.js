import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Query from "./screens/Query";
import Home from "./screens/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/query/:video" element={<Query />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
