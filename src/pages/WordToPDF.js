import React, { useState } from 'react';
import { FaUpload, FaFileWord } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// ConvertAPI Word → PDF with StoreFile=true for downloadable link
const convertWordToPdfApi = async (file) => {
  const formData = new FormData();
  formData.append('File', file);
  const response = await fetch(
    'https://v2.convertapi.com/convert/docx/to/pdf?Secret=2gWjG4LDdobEgdOP1olu9T1bSztrElRY&StoreFile=true',
    { method: 'POST', body: formData }
  );
  if (!response.ok) throw new Error('Conversion failed');

  const json = await response.json();
  if (!json.Files || json.Files.length === 0) throw new Error('No converted file returned');

  const fileUrl = json.Files[0].Url;
  const pdfResponse = await fetch(fileUrl);
  if (!pdfResponse.ok) throw new Error('Failed to download converted PDF file');
  return await pdfResponse.blob();
};

const WordToPdfConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [isMultipleFiles, setIsMultipleFiles] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setConvertedFile(null);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one Word file first.');
      return;
    }

    setIsConverting(true);
    try {
      if (isMultipleFiles) {
        const zip = new JSZip();
        for (const file of selectedFiles) {
          const pdfBlob = await convertWordToPdfApi(file);
          zip.file(file.name.replace(/\.[^/.]+$/, '') + '.pdf', pdfBlob);
        }
        const content = await zip.generateAsync({ type: 'blob' });
        setConvertedFile({ blob: content, name: 'converted_files.zip' });
      } else {
        const pdfBlob = await convertWordToPdfApi(selectedFiles[0]);
        setConvertedFile({ blob: pdfBlob, name: selectedFiles[0].name.replace(/\.[^/.]+$/, '') + '.pdf' });
      }
    } catch (e) {
      alert('Conversion failed: ' + e.message);
    }
    setIsConverting(false);
  };

  const handleDownload = () => {
    if (convertedFile) {
      saveAs(convertedFile.blob, convertedFile.name);
    }
  };

  return (
    <div className="converter-page py-16 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <section className="tool-section bg-white bg-opacity-20 p-8 md:p-12 rounded-lg shadow-lg max-w-3xl mx-auto text-center">
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
              Drag and drop your Word files here, or{' '}
              <span className="text-yellow-400 font-semibold underline">click to browse</span>.
            </p>
          </label>
        </div>
        {selectedFiles.length > 0 && (
          <div className="bg-white bg-opacity-40 p-4 rounded-md mb-6">
            <p className="text-white">
              Selected Files:{' '}
              <span className="font-semibold">{selectedFiles.length} files selected</span>
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
            <span className="ml-2 font-semibold">Get converted files in a single ZIP</span>
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
            {isConverting ? 'Converting...' : 'Convert to PDF'}
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-green-400 font-semibold mb-2">Conversion Complete! ✅</p>
            <button
              onClick={handleDownload}
              className="bg-green-400 text-gray-900 font-bold py-3 px-12 rounded-lg shadow-md hover:bg-green-500 transition duration-300 transform hover:scale-105"
            >
              Download Converted File
            </button>
          </div>
        )}
      </section>
      <section className="supported-formats text-center py-12 text-white">
        <h3 className="text-3xl font-bold mb-8">Supported Format</h3>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <FaFileWord className="text-indigo-600 text-6xl mb-2" />
            <span className="font-medium">Word → PDF</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordToPdfConverter;
