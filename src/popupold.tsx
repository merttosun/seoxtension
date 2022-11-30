import { CHROME_MESSAGE } from "./constants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  setMetaTags,
  setLDJson,
  setPerformanceMetrics,
  setAnchorCount,
  setStatusCode,
  setRedirectionUrl,
} from "./functions";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  setInterval(function () {
    chrome.tabs.sendMessage(
      tabs[0].id!,
      { msg: CHROME_MESSAGE.META },
      function (response) {
        setMetaTags(response);
      }
    );
    chrome.tabs.sendMessage(
      tabs[0].id!,
      { msg: CHROME_MESSAGE.LD_JSON },
      function (response) {
        setLDJson(response);
      }
    );
    chrome.tabs.sendMessage(
      tabs[0].id!,
      { msg: CHROME_MESSAGE.PERFORMANCE },
      function (response) {
        setPerformanceMetrics(response);
      }
    );
    chrome.tabs.sendMessage(
      tabs[0].id!,
      { msg: CHROME_MESSAGE.ANCHOR },
      function (response) {
        setAnchorCount(response);
      }
    );
  }, 500);
});

chrome.webRequest.onCompleted.addListener(
  function (details) {
    setStatusCode(details);
    //add you new required feature
  },
  {
    urls: ["<all_urls>"],
  },
  ["responseHeaders"]
);

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    setRedirectionUrl(details);
    //add you new required feature
  },
  {
    urls: ["<all_urls>"],
  },
  ["responseHeaders"]
);
