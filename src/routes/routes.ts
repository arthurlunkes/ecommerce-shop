import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Router>
  );
};

export default routes;