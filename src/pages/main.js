import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
  <div className="main-page px-4 bg-gray-50 min-h-screen pb-24">
    {/* Hero Section */}
    <section className="text-center py-16 bg-white rounded-xl max-w-3xl mx-auto mt-12 shadow-md">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Convert your files, <span className="text-blue-600">your way.</span> 💻
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
        A free online tool to convert and merge files instantly.
      </p>
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/file-converter"
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow hover:bg-blue-700 transition"
        >
          Start Converting Now
        </Link>
        <a
          href="#features"
          className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition"
        >
          Learn More
        </a>
      </div>
      {/* File type row */}
      <div className="mt-6 flex justify-center space-x-3 text-gray-500 text-lg">
        <span className="border px-3 py-1 rounded-lg bg-gray-100">PDF</span>
        <span className="border px-3 py-1 rounded-lg bg-gray-100">DOC</span>
        <span className="border px-3 py-1 rounded-lg bg-gray-100">JPG</span>
        <span className="border px-3 py-1 rounded-lg bg-gray-100">PNG</span>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-16">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
        Key Features
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-400">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">File Conversion</h3>
          <p className="text-gray-700">
            Convert any file format instantly.
            <span className="font-semibold text-blue-600"> 200+ formats</span>.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-400">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">PDF Merger</h3>
          <p className="text-gray-700">
            Merge multiple PDF files into a single, organized document.
          </p>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-16 bg-gray-100 rounded-xl max-w-4xl mx-auto mb-12">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6">
          <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-bold">
            1
          </div>
          <h3 className="text-base font-semibold text-gray-800">Upload Files ⬆️</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Drag and drop or browse your device.
          </p>
        </div>
        <div className="p-6">
          <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-bold">
            2
          </div>
          <h3 className="text-base font-semibold text-gray-800">Choose Options ⚙️</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Select your output format or merge settings.
          </p>
        </div>
        <div className="p-6">
          <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-bold">
            3
          </div>
          <h3 className="text-base font-semibold text-gray-800">
            Download Results 📥
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            Get your files instantly, available for 24 hours.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Main;
