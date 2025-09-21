import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewScreen from './components/InterviewScreen';
import ProctorReport from './components/ProctorReport';
import ReportsTest  from "./components/test";
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Video Proctoring System</h1>
        </header>
        <Routes>
          <Route path="/" element={<InterviewScreen />} />
          <Route path="/interview/:id" element={<InterviewScreen />} />
          <Route path="/report/:id" element={<ProctorReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


