import React from 'react';
import './App.css'; // or './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Main from './pages/main';
import FileConverter from './pages/FileConverter';
import PDFMerger from './pages/PDFMerger';
import Calculator from './pages/Calculator';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/file-converter" element={<FileConverter />} />
            <Route path="/pdf-merger" element={<PDFMerger />} />
            <Route path="/Calculator" element={<Calculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
