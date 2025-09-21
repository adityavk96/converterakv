import React, { useState } from 'react';
import { FaUpload, FaFilePdf } from 'react-icons/fa';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const reducePdfFileSizeApi = async (file, sizeInKb) => {
  const formData = new FormData();
  formData.append('File', file);
  formData.append('StoreFile', 'true');

  // Map approximate target file size in KB to CompressionLevel preset
  // These are example mappings; adjust according to your API docs/tuning
  // Smaller sizeInKb means higher compression preset (lower quality)
  let compressionPreset = 'Archive'; // default strong compression ~90%

  if (sizeInKb) {
    if (sizeInKb > 5000) compressionPreset = 'Text';     // Light compression, bigger file
    else if (sizeInKb > 1000) compressionPreset = 'Ebook'; // Medium compression
    else if (sizeInKb > 500) compressionPreset = 'Web';    // Stronger compression
    else compressionPreset = 'Archive';                     // Max compression
  }

  const url = `https://v2.convertapi.com/convert/pdf/to/compress?CompressionLevel=${compressionPreset}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer X5cjriINkBq8Of2KUglSmllqRttWedxD', // your token
    },
    body: formData,
  });

  if (!response.ok) throw new Error('PDF size reduction failed');

  const json = await response.json();
  if (!json.Files || json.Files.length === 0) throw new Error('No compressed file returned');

  const fileUrl = json.Files[0].Url;
  const pdfResponse = await fetch(fileUrl);
  if (!pdfResponse.ok) throw new Error('Failed to download compressed PDF file');

  return await pdfResponse.blob();
};

const PdfSizeReducer = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isReducing, setIsReducing] = useState(false);
  const [reducedFile, setReducedFile] = useState(null);
  const [isMultipleFiles, setIsMultipleFiles] = useState(false);
  const [targetSize, setTargetSize] = useState('');
  const [targetUnit, setTargetUnit] = useState('KB');

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setReducedFile(null);
  };

  const handleReduce = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one PDF file.');
      return;
    }

    setIsReducing(true);
    try {
      // Convert targetSize + targetUnit to KB number
      let sizeInKb = null;
      if (targetSize) {
        if (targetUnit === 'MB') sizeInKb = parseFloat(targetSize) * 1024;
        else sizeInKb = parseFloat(targetSize);
      }

      if (isMultipleFiles) {
        const zip = new JSZip();
        for (const file of selectedFiles) {
          const reducedBlob = await reducePdfFileSizeApi(file, sizeInKb);
          zip.file(file.name, reducedBlob);
        }
        const content = await zip.generateAsync({ type: 'blob' });
        setReducedFile({ blob: content, name: 'reduced_pdfs.zip' });
      } else {
        const reducedBlob = await reducePdfFileSizeApi(selectedFiles[0], sizeInKb);
        setReducedFile({ blob: reducedBlob, name: selectedFiles[0].name });
      }
    } catch (e) {
      alert('Size reduction failed: ' + e.message);
    }
    setIsReducing(false);
  };

  const handleDownload = () => {
    if (reducedFile) {
      saveAs(reducedFile.blob, reducedFile.name);
    }
  };

  return (
    <div className="converter-page py-16 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <section className="tool-section bg-white bg-opacity-20 p-8 md:p-12 rounded-lg shadow-lg max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">PDF File Size Reducer</h2>

        {/* File Upload Box */}
        <div className="file-upload-area border-2 border-dashed border-white rounded-lg p-10 mb-6 hover:bg-white hover:bg-opacity-30 transition duration-300 cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
            accept="application/pdf"
            multiple
          />
          <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center text-white">
            <FaUpload className="text-white text-5xl mb-4" />
            <p className="font-medium">
              Drag and drop PDF files here, or{' '}
              <span className="text-yellow-400 font-semibold underline">click to browse</span>.
            </p>
          </label>
        </div>

        {/* Target size input along with unit */}
        <div className="flex justify-center mb-4 items-center space-x-2">
          <input
            type="number"
            min="1"
            step="any"
            value={targetSize}
            onChange={(e) => setTargetSize(e.target.value)}
            placeholder="Size"
            className="px-3 py-2 rounded-md text-gray-900"
            style={{ width: '70px' }}
          />
          <select
            value={targetUnit}
            onChange={(e) => setTargetUnit(e.target.value)}
            className="px-3 py-2 rounded-md text-gray-900"
          >
            <option value="KB">KB</option>
            <option value="MB">MB</option>
          </select>
        </div>

        {/* Checkbox toggle */}
        <div className="flex items-center justify-center mb-6 text-white">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isMultipleFiles}
              onChange={(e) => setIsMultipleFiles(e.target.checked)}
              className="form-checkbox text-yellow-400 rounded-lg h-5 w-5"
            />
            <span className="ml-2 font-semibold">Get reduced files in a single ZIP</span>
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <div className="bg-white bg-opacity-40 p-4 rounded-md mb-6">
            <p className="text-white">Selected Files: <span className="font-semibold">{selectedFiles.length} PDFs selected</span></p>
          </div>
        )}

        {!reducedFile ? (
          <button
            onClick={handleReduce}
            disabled={isReducing || selectedFiles.length === 0}
            className={`w-full md:w-auto font-bold py-3 px-12 rounded-lg shadow-md transition duration-300 ${
              isReducing
                ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                : 'bg-yellow-400 hover:bg-yellow-500 transform hover:scale-105 text-gray-900'
            }`}
          >
            {isReducing ? 'Reducing...' : 'Reduce PDF Size'}
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-green-400 font-semibold mb-2">Reduction Complete! ✅</p>
            <button
              onClick={handleDownload}
              className="bg-green-400 text-gray-900 font-bold py-3 px-12 rounded-lg shadow-md hover:bg-green-500 transition duration-300 transform hover:scale-105"
            >
              Download Reduced File
            </button>
          </div>
        )}
      </section>
      <section className="supported-formats text-center py-12 text-white">
        <h3 className="text-3xl font-bold mb-8">Supported Format</h3>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <FaFilePdf className="text-red-600 text-6xl mb-2" />
            <span className="font-medium">PDF</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PdfSizeReducer;
