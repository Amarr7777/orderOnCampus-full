import { useState } from 'react'
import './App.css'
import AddCanteen from './pages/AddCanteen'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CanteenStaff from './pages/CanteenStaff'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCanteen />} />
        <Route path="/canteenStaff/*" element={<CanteenStaff/>} />
      </Routes>
    </Router>
  )
}

export default App
