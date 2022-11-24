import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <div>Hello, world!</div>;
}