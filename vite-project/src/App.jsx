import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/Pages/HomePage';
import Dashboard from './components/Pages/Dashboard';
import Add from './components/Pages/Add';
const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<Add />} />
      </Routes>
    
    </Router>
  )
}

export default App