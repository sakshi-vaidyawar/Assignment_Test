import React, { useState, useRef, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import NavBar from "./NavBar";



const FileUpload = ({ userName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  let [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const fileInputRef = useRef(null);
// Save uploaded files to local storage whenever uploadedFiles state changes
  let storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  uploadedFiles = storedFiles;
  
// handle Change for Selectefile
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
// Function for upload the file with progressbar.
  const handleUpload = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadstart = () => {
      setShowProgressBar(true);
    };

    reader.onloadend = () => {
      const newFile = {
        name: selectedFile.name,
        url: reader.result,
      };
      
      // to store the file data on localStorage.
      setUploadedFiles(uploadedFiles.push(newFile))
      localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);

      setSelectedFile(null);
      fileInputRef.current.value = "";
    };
    reader.readAsDataURL(selectedFile);
    
  };

  // function for download the uploaded file .
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const fakeDownloadProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setDownloadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);
    };

    fakeDownloadProgress();
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 p-6">
        <div className="w-96 p-6 bg-white rounded shadow-lg shadow-purple-400">
          <h2 className="mb-4 text-xl font-bold text-center">
            File Upload & Download
          </h2>
          <div className="mb-4">
            <label htmlFor="file-upload" className="custom-file-upload">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
              </svg>

              <span className="ml-2">Upload File</span>
            </label>{" "}
            <span className="file-name">{selectedFile?.name || ""}</span>
            <input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={handleUpload}
            className="w-full px-3 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            Upload
          </button>
          {showProgressBar > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{
                    width: `${uploadProgress}%`,
                    display: uploadProgress === 100 ? "none" : "block",
                  }}
                ></div>
              </div>
              <p
                className="mt-1 text-sm text-center"
                style={{ display: uploadProgress === 100 ? "none" : "block" }}
              >
                {uploadProgress}%
              </p>
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Uploaded Files</h3>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="mb-2 flex items-center justify-between"
              >
                <span>{file.name}</span>
                <button
                  title="Download"
                  onClick={() => handleDownload(file)}
                  className="px-3 py-1 text-white bg-green-500 rounded"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {downloadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{
                    width: `${downloadProgress}%`,
                    display: downloadProgress === 100 ? "none" : "block",
                  }}
                ></div>
              </div>
              <p
                className="mt-1 text-sm text-center"
                style={{ display: downloadProgress === 100 ? "none" : "block" }}
              >
                {downloadProgress}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
