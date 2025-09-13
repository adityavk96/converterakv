import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
  <div className="main-page px-4 min-h-screen pb-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
    {/* Hero Section */}
    <section className="text-center py-16 bg-white bg-opacity-20 rounded-xl max-w-3xl mx-auto mt-12 shadow-md">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
        Convert your files, <span className="text-yellow-300">your way.</span> 💻
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
        A free online tool to convert and merge files instantly.
      </p>
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/file-converter"
          className="bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-full shadow hover:bg-yellow-500 transition"
        >
          Start Converting Now
        </Link>
        <a
          href="#features"
          className="bg-white bg-opacity-30 text-yellow-400 border border-yellow-400 font-semibold py-3 px-8 rounded-full shadow hover:bg-yellow-100 hover:text-yellow-500 transition"
        >
          Learn More
        </a>
      </div>
      {/* File type row */}
      <div className="mt-6 flex justify-center space-x-3 text-yellow-200 text-lg">
        <span className="border px-3 py-1 rounded-lg bg-white bg-opacity-20">PDF</span>
        <span className="border px-3 py-1 rounded-lg bg-white bg-opacity-20">DOC</span>
        <span className="border px-3 py-1 rounded-lg bg-white bg-opacity-20">JPG</span>
        <span className="border px-3 py-1 rounded-lg bg-white bg-opacity-20">PNG</span>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-16">
      <h2 className="text-center text-3xl font-bold text-white mb-10">
        Key Features
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-20 p-8 rounded-xl shadow-md border-t-4 border-yellow-400">
          <h3 className="text-xl font-semibold text-white mb-2">File Conversion</h3>
          <p className="text-yellow-200">
            Convert any file format instantly.
            <span className="font-semibold text-yellow-400"> 200+ formats</span>.
          </p>
        </div>
        <div className="bg-white bg-opacity-20 p-8 rounded-xl shadow-md border-t-4 border-yellow-400">
          <h3 className="text-xl font-semibold text-white mb-2">PDF Merger</h3>
          <p className="text-yellow-200">
            Merge multiple PDF files into a single, organized document.
          </p>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-16 bg-white bg-opacity-20 rounded-xl max-w-4xl mx-auto mb-12">
      <h2 className="text-center text-3xl font-bold text-white mb-10">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className="p-6">
            <div className="bg-yellow-400 text-gray-900 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-bold">
              {step}
            </div>
            <h3 className="text-base font-semibold text-white">
              {step === 1 && "Upload Files ⬆️"}
              {step === 2 && "Choose Options ⚙️"}
              {step === 3 && "Download Results 📥"}
            </h3>
            <p className="mt-2 text-yellow-200 text-sm">
              {step === 1 && "Drag and drop or browse your device."}
              {step === 2 && "Select your output format or merge settings."}
              {step === 3 && "Get your files instantly, available for 24 hours."}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Main;
