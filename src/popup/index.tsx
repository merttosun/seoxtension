import { CHROME_MESSAGE } from "../constants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";

chrome.tabs &&
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let metaTags = {};
    let performanceMetrics = {};

    setInterval(() => {
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { msg: CHROME_MESSAGE.META },
        function (response) {
          metaTags = response;
        }
      );

      chrome.tabs.sendMessage(
        tabs[0].id!,
        { msg: CHROME_MESSAGE.PERFORMANCE },
        function (response) {
          performanceMetrics = response;
          console.log({ performanceMetrics: response });
        }
      );

      ReactDOM.render(
        <Popup metaTags={metaTags} performanceMetrics={performanceMetrics} />,
        document.getElementById("popup")
      );
    }, 500);
  });
