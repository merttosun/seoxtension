import { CHROME_MESSAGE } from "../constants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";

chrome.tabs &&
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let metaTags = {};
    setInterval(() => {
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { msg: CHROME_MESSAGE.META },
        function (response) {
          console.log("index.tsx", { response });
          metaTags = response;
        }
      );
      ReactDOM.render(
        <Popup tabId={tabs[0].id!} metaTags={metaTags} />,
        document.getElementById("popup")
      );
    }, 300);
  });
