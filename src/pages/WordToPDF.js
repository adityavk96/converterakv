import React, { useState } from 'react';
import { FaUpload, FaFileWord } from 'react-icons/fa';
import { saveAs } from 'file-saver';

// Upload a single file and get PDF blob (used internally, shown for completeness)
const convertWordToPdfLocal = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/convert-word', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Conversion failed');
  return await response.blob();
};

// Main component
const WordToPDFPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isMultipleFiles, setIsMultipleFiles] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);

  // Handle input file change
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setConvertedFile(null);
  };

  // Handle convert button click — upload all files at once with zip option
  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one Word file first.');
      return;
    }

    setIsConverting(true);

    try {
      const formData = new FormData();
      // Append all files under key 'files'
      selectedFiles.forEach((file) => formData.append('files', file));
      formData.append('zip', isMultipleFiles ? 'true' : 'false');

      const response = await fetch('/api/convert-word', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Conversion failed');
      const blob = await response.blob();

      const fileName = isMultipleFiles ? 'converted.zip' : 'converted.pdf';

      setConvertedFile({ blob, name: fileName });
    } catch (error) {
      alert('Conversion failed: ' + error.message);
    }
    setIsConverting(false);
  };

  // Download the converted file
  const handleDownload = () => {
    if (convertedFile) {
      saveAs(convertedFile.blob, convertedFile.name);
      setConvertedFile(null);
      setSelectedFiles([]);
    }
  };

  return (
    <div className="converter-page py-16 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <section className="tool-section bg-white bg-opacity-20 p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Word to PDF Converter</h2>
        <div className="file-upload-area border-2 border-dashed border-white rounded-lg p-10 mb-6 hover:bg-white hover:bg-opacity-30 transition duration-300 cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".doc,.docx"
            multiple
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center text-white">
            <FaUpload className="text-white text-5xl mb-4" />
            <p className="font-medium">
              Drag and drop Word files here, or{' '}
              <span className="text-yellow-400 font-semibold underline">click to browse</span>.
            </p>
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <div className="bg-white bg-opacity-40 p-4 rounded-md mb-6">
            <p className="text-white">
              Selected Word Files: <span className="font-semibold">{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected</span>
            </p>
          </div>
        )}

        <div className="flex items-center justify-center mb-6 text-white">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isMultipleFiles}
              onChange={(e) => setIsMultipleFiles(e.target.checked)}
              className="form-checkbox text-yellow-400 rounded-lg h-5 w-5"
            />
            <span className="ml-2 font-semibold">
              Download separate PDFs in a single ZIP file
            </span>
          </label>
        </div>

        {!convertedFile ? (
          <button
            onClick={handleConvert}
            disabled={isConverting || selectedFiles.length === 0}
            className={`w-full md:w-auto font-bold py-3 px-12 rounded-lg shadow-md transition duration-300 ${
              isConverting
                ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                : 'bg-yellow-400 hover:bg-yellow-500 transform hover:scale-105 text-gray-900'
            }`}
          >
            {isConverting ? 'Converting...' : 'Convert Word Files'}
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-green-400 font-semibold mb-2">
              Conversion Complete! ✅
            </p>
            <button
              onClick={handleDownload}
              className="bg-green-400 text-gray-900 font-bold py-3 px-12 rounded-lg shadow-md hover:bg-green-500 transition duration-300 transform hover:scale-105"
            >
              Download
            </button>
          </div>
        )}
      </section>

      <section className="supported-formats text-center py-12 text-white">
        <h3 className="text-3xl font-bold mb-8">Supported Formats</h3>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <FaFileWord className="text-indigo-600 text-6xl mb-2" />
            <span className="font-medium">Word (.doc, .docx)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordToPDFPage;
