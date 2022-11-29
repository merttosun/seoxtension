import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  ReactDOM.render(<Popup />, document.getElementById("popup"));
});
