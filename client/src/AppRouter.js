import React from "react";
import Main from './components/Main'
import Home from  "./components/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export const AppRouter = () => {

  const reload = () => window.location.reload();
  
  return (
    <Router>
      <Routes>
          {/*
          <Route path="/" element={<Home />}></Route>
          */}
          <Route path="/neoland-bootcamp" element={<Main />}></Route>
      </Routes>
    </Router>
  );
};