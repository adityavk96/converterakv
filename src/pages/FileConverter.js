import React, { useState } from 'react';
import { FaUpload, FaFileImage, FaFileWord } from 'react-icons/fa';
import JSZip from 'jszip';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

// ConvertAPI Word to PDF with StoreFile=true for proper download URL
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

const FileConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [outputType, setOutputType] = useState('image');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [isMultipleFiles, setIsMultipleFiles] = useState(false);

  const fileTypeMap = {
    image: 'image/*',
    word: '.doc,.docx',
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setConvertedFile(null);
  };

  // Convert image file to JPEG data URL for jsPDF
  const fileToJPEGDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const jpegDataUrl = canvas.toDataURL('image/jpeg', 1.0);
          resolve({ dataUrl: jpegDataUrl, width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file first.');
      return;
    }

    setIsConverting(true);
    try {
      if (outputType === 'image') {
        if (isMultipleFiles) {
          const zip = new JSZip();
          for (const file of selectedFiles) {
            const pdf = new jsPDF();
            const { dataUrl, width, height } = await fileToJPEGDataURL(file);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (height * pdfWidth) / width;
            pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output('blob');
            zip.file(file.name.replace(/\.[^/.]+$/, '') + '.pdf', pdfBlob);
          }
          const content = await zip.generateAsync({ type: 'blob' });
          setConvertedFile({ blob: content, name: 'converted_files.zip' });
        } else {
          const pdf = new jsPDF();
          for (let i = 0; i < selectedFiles.length; i++) {
            const { dataUrl, width, height } = await fileToJPEGDataURL(selectedFiles[i]);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (height * pdfWidth) / width;
            if (i > 0) pdf.addPage();
            pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          }
          const pdfBlob = pdf.output('blob');
          setConvertedFile({ blob: pdfBlob, name: `converted_files_${Date.now()}.pdf` });
        }
      } else if (outputType === 'word') {
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

  const getIconForType = (type) => {
    if (type === 'image') return <FaFileImage className="text-blue-500 text-6xl mb-2" />;
    if (type === 'word') return <FaFileWord className="text-indigo-600 text-6xl mb-2" />;
    return null;
  };

  return (
    <div className="converter-page py-16 px-4">
      <section className="tool-section bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Transform Any File Format Instantly</h2>
        <div className="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-10 mb-6 hover:bg-gray-50 transition duration-300">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept={fileTypeMap[outputType]}
            multiple
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <FaUpload className="text-gray-400 text-5xl mb-4" />
              <p className="text-gray-600 font-medium">
                Drag and drop files here, or{' '}
                <span className="text-indigo-600 font-semibold">click to browse</span>.
              </p>
            </div>
          </label>
        </div>
        {selectedFiles.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-gray-700">
              Selected Files:{' '}
              <span className="font-semibold text-gray-900">{selectedFiles.length} files selected</span>
            </p>
          </div>
        )}
        <div className="conversion-options flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <label htmlFor="type-select" className="text-gray-700 font-semibold">
            Convert to:
          </label>
          <select
            id="type-select"
            value={outputType}
            onChange={(e) => {
              setOutputType(e.target.value);
              setSelectedFiles([]);
              setConvertedFile(null);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="image">Image to PDF</option>
            <option value="word">Word to PDF</option>
          </select>
        </div>
        <div className="flex items-center justify-center mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isMultipleFiles}
              onChange={(e) => setIsMultipleFiles(e.target.checked)}
              className="form-checkbox text-indigo-600 rounded-lg h-5 w-5"
            />
            <span className="ml-2 text-gray-700 font-semibold">Get converted files in a single ZIP file</span>
          </label>
        </div>
        {!convertedFile ? (
          <button
            onClick={handleConvert}
            disabled={isConverting || selectedFiles.length === 0}
            className={`w-full md:w-auto font-bold py-3 px-12 rounded-lg shadow-md transition duration-300 ${
              isConverting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 text-white'
            }`}
          >
            {isConverting ? 'Converting...' : 'Convert'}
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-green-600 font-semibold mb-2">Conversion Complete! ✅</p>
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white font-bold py-3 px-12 rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
            >
              Download Converted File
            </button>
          </div>
        )}
      </section>
      <section className="supported-formats text-center py-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Supported Formats</h3>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            {getIconForType('word')}
            <span className="text-gray-700 font-medium">Word</span>
          </div>
          <div className="flex flex-col items-center">
            {getIconForType('image')}
            <span className="text-gray-700 font-medium">Image</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileConverter;
