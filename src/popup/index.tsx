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
    let performanceMetricsMeasured = false;
    let metaTagsFetched = false;

    setInterval(() => {
      if (!metaTagsFetched) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.META },
          function (response) {
            if (response.title.length > 0) {
              metaTagsFetched = true;
            }
            metaTags = response;
          }
        );
      }

      if (!performanceMetricsMeasured) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.PERFORMANCE },
          function (response: PERFORMANCE_DATA) {
            if (response) {
              performanceMetricsMeasured = true;
            }
            performanceMetrics = response;
            console.log({ performanceMetrics: response });
          }
        );
      }

      ReactDOM.render(
        <Popup metaTags={metaTags} performanceMetrics={performanceMetrics} />,
        document.getElementById("popup")
      );
    }, 200);
  });
