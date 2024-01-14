import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/Pages/HomePage';
import Dashboard from './components/Pages/Dashboard';
import Add from './components/Pages/Add';
import Edit from './components/Edit';
import View from './components/Pages/View';
export const baseUrl = 'https://mindful-fullstack-backend.onrender.com';
const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<Add />} />
        <Route path="/dashboard/edit/:id" element={<Edit/>} />
        <Route path="/dashboard/view/:id" element={<View/>} />
      </Routes>
    
    </Router>
  )
}

export default App