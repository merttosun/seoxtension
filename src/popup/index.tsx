import { CHROME_MESSAGE } from "../constants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";
import { PERFORMANCE_DATA } from "crawler/performance-crawler";
import { META_DATA } from "crawler/meta-crawler";
import { LINK_DATA } from "crawler/anchor-crawler";
import { LD_JSON_DATA } from "crawler/ld-crawler";

chrome.tabs &&
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // initial data
    let metaTags: META_DATA = {
      title: "",
      description: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      canonical: "",
      h1Tag: "",
    };

    let performanceMetrics: PERFORMANCE_DATA = {
      ttfb: 0,
      fcp: 0,
      domLoadTime: 0,
      windowLoadTime: 0,
    };

    // to avoid sending message continually
    let performanceMetricsMeasured = false;
    let metaTagsFetched = false;
    let ldJsonsFetched = false;
    let anchorsCountFetched = false;

    setInterval(() => {
      // send message to trigger meta crawler for collecting meta tags from document
      if (!metaTagsFetched) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.META },
          function (response: META_DATA) {
            if (response.title.length > 0) {
              metaTagsFetched = true;
            }
            metaTags = response;
          }
        );
      }

      // send message to trigger performance crawler for collecting performance metrics
      if (!performanceMetricsMeasured) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.PERFORMANCE },
          function (response: PERFORMANCE_DATA) {
            if (response.ttfb !== 0) {
              performanceMetricsMeasured = true;
            }
            performanceMetrics = response;
          }
        );
      }

      // send message to trigger anchor-crawler for measuring anchor count
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { msg: CHROME_MESSAGE.ANCHOR },
        function (response: LINK_DATA) {
          if (response.length) {
            anchorsCountFetched = true;
          }
          setAnchorCount(response);
        }
      );

      // send message to ld crawler for collecting ld+json's from document
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { msg: CHROME_MESSAGE.LD_JSON },
        function (response: LD_JSON_DATA) {
          if (response) {
            ldJsonsFetched = true;
          }
          setLDJson(response);
        }
      );

      ReactDOM.render(
        <Popup metaTags={metaTags} performanceMetrics={performanceMetrics} />,
        document.getElementById("popup")
      );
    }, 200);
  });

function setAnchorCount(links: any) {
  if (links) {
    document.getElementById("anchor-count")!.innerText = String(links.length);
  }
}

function setLDJson(jsonData: any) {
  if (jsonData) {
    document.getElementById("ld-json")!.innerText = JSON.stringify(jsonData);
  }
}

// redirection
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

function setStatusCode(details: chrome.webRequest.WebResponseCacheDetails) {
  document.getElementById("statusCode")!.innerText = String(details.statusCode);
}

function setRedirectionUrl(
  details: chrome.webRequest.WebResponseHeadersDetails
) {
  details.responseHeaders?.filter((obj) => {
    if (obj.name === "location") {
      document.getElementById("redirection-info")!.innerText = String(
        obj.value
      );
    }
  });
}
