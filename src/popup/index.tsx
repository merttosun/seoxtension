import { CHROME_MESSAGE } from "../constants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";
import { PERFORMANCE_DATA } from "crawler/performance-crawler";

chrome.tabs &&
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let metaTags = {};

    let performanceMetrics: PERFORMANCE_DATA = {
      ttfb: 0,
      fcp: 0,
      domLoadTime: 0,
      windowLoadTime: 0,
    };

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
        function (response: PERFORMANCE_DATA) {
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
