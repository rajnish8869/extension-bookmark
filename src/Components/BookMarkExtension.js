import React, { useState } from "react";
import "./BookMarkExtension.css"; // Import the CSS file
import data from "../Data/Data.json";

// The JSON data

const BookMarkExtension = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(""), 2000); // Clear the copied message after 2 seconds
    });
  };

  const fileUrl =
    "https://github.com/rajnish8869/AllInOneExtensionVSCode/raw/master/remove-comments-0.0.1.vsix";

  const downloadFile = () => {
    // Create an invisible anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "remove-comments-0.0.1.vsix"); // Suggest filename
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Cleanup
    document.body.removeChild(link);

    // Update button state
    setIsDownloaded(true);

    // Reset button state after 2 seconds
    setTimeout(() => {
      setIsDownloaded(false);
    }, 2000);
  };

  return (
    <div className="container ">
      <h1>Extensions & Bookmarks</h1>
      <ul className="message-list">
        {data.map((item, index) => {
          return (
            <li key={index} className="message-item">
              <div className="message-content">
                <div className="message-content-Header">
                  <strong>{`${item.Title} ${
                    item.Type === "Vscodeextension"
                      ? "(VS Code Extension)"
                      : item.Type === "Bookmark"
                      ? "(Bookmark)"
                      : ""
                  }`}</strong>
                  {item.Type === "Bookmark" ? (
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${decodeURIComponent(item.Description)}`
                        )
                      }
                      className={
                        copied === `${decodeURIComponent(item.Description)}`
                          ? "copied"
                          : "Copy"
                      }
                    >
                      {copied === `${decodeURIComponent(item.Description)}` ? (
                        <span className="copied-text">Copied!</span>
                      ) : (
                        "Copy"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={downloadFile}
                      className={`download-button ${
                        isDownloaded ? "downloaded" : ""
                      }`}
                    >
                      {isDownloaded ? "Downloaded" : "Download File"}
                    </button>
                  )}
                </div>
                <div className="message-content-Body custom-scrollbar">
                  <p>{decodeURIComponent(item.Description)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookMarkExtension;
