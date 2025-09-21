import React, { useState } from 'react';

const FileSizeReducePage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [minSizeKB, setMinSizeKB] = useState(50);
  const [message, setMessage] = useState('');
  const [reducedFiles, setReducedFiles] = useState(null);
  const [isReducing, setIsReducing] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setReducedFiles(null);
    setMessage('');
  };

  const handleMinSizeChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > 1000) val = 1000;
    setMinSizeKB(val);
  };

  const handleReduce = () => {
    if (!selectedFiles.length) {
      setMessage('Please select files first.');
      return;
    }
    setIsReducing(true);
    setMessage('');
    setReducedFiles(null);

    // Simulate async reduction process (replace with real logic)
    setTimeout(() => {
      const filtered = selectedFiles.filter(file => file.size / 1024 >= minSizeKB);
      if (filtered.length === 0) {
        setMessage(`No files equal or larger than ${minSizeKB} KB.`);
        setReducedFiles(null);
      } else {
        setMessage('File size reduction complete!');
        setReducedFiles(filtered);
      }
      setIsReducing(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (!reducedFiles || reducedFiles.length === 0) return;

    // For each file, create download link and click programmatically
    reducedFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-4xl font-bold mb-8">File Size Reducer</h1>
      <div className="bg-white bg-opacity-90 rounded-lg p-8 max-w-lg w-full shadow-lg">
        <label className="block mb-2 font-semibold text-gray-800" htmlFor="min-size-input">
          Minimum File Size (KB):
        </label>
        <input
          id="min-size-input"
          type="number"
          min="1"
          max="1000"
          value={minSizeKB}
          onChange={handleMinSizeChange}
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <label className="block mb-2 font-semibold text-gray-800" htmlFor="file-upload">
          Select Files:
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4 cursor-pointer"
        />

        {message && (
          <p className={`mb-4 font-semibold ${message.includes('complete') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleReduce}
          disabled={isReducing}
          className={`w-full mb-4 py-3 rounded font-bold text-white transition ${
            isReducing ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          {isReducing ? 'Reducing...' : 'Reduce File Size'}
        </button>

        {reducedFiles && reducedFiles.length > 0 && (
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded font-bold text-white bg-green-600 hover:bg-green-700 transition"
          >
            Download Reduced Files
          </button>
        )}
      </div>
    </div>
  );
};

export default FileSizeReducePage;
