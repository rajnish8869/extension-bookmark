import React, { useState } from "react";
import "./BookMarkExtension.css"; // Import the CSS file
import data from "../Data/Data.json";

// The JSON data

const BookMarkExtension = () => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(""), 2000); // Clear the copied message after 2 seconds
    });
  };

  return (
    <div className="container">
      <h1>Extensions & Bookmarks</h1>
      <ul className="message-list">
        {data.map((item, index) => {
          const key = Object.keys(item)[0];
          const message = item[key];
          return (
            <li key={index} className="message-item">
              <div className="message-content">
                <div className="message-content-Header">
                  <strong>{key}</strong>
                  <button
                    onClick={() =>
                      copyToClipboard(`${decodeURIComponent(message)}`)
                    }
                    className={
                      copied === `${decodeURIComponent(message)}`
                        ? "copied"
                        : "Copy"
                    }
                  >
                    {copied === `${decodeURIComponent(message)}` ? (
                      <span className="copied-text">Copied!</span>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>
                <div className="message-content-Body custom-scrollbar">
                  <p>{decodeURIComponent(message)}</p>
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
