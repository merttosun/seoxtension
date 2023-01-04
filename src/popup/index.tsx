import { CHROME_MESSAGE } from "../constants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";
import { PERFORMANCE_DATA } from "crawler/performance-crawler";
import { META_DATA } from "crawler/meta-crawler";
import { LINK_DATA } from "crawler/anchor-crawler";
import { LD_JSON_DATA } from "crawler/ld-crawler";
import {IMAGE_DATA} from "../crawler/image-crawler";
import {logDOM} from "@testing-library/dom";

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

    let images: IMAGE_DATA = [];

    let ldJson: string[];

    // to avoid sending message continually
    let performanceMetricsMeasured = false;
    let metaTagsFetched = false;
    let ldJsonsFetched = false;
    let anchorsCountFetched = false;
    let imagesFetched = false;

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

            if (metaTags.ogImage) {
              (document.getElementById("ogimage")! as HTMLImageElement).src =
                metaTags.ogImage; // after image viewer component implementation this should be removed
            }
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

      if(!imagesFetched) {
        chrome.tabs.sendMessage(
            tabs[0].id!,
            { msg: CHROME_MESSAGE.IMAGE },
            function (response: IMAGE_DATA) {
              if (response.length > 0) {
                imagesFetched = true;
              }
              images = response;
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
        if (!ldJsonsFetched) {
            chrome.tabs.sendMessage(
                tabs[0].id!,
                {msg: CHROME_MESSAGE.LD_JSON},
                function (response: string[]) {
                    if (response) {
                        ldJsonsFetched = true;
                    }
                    
                    ldJson = response
                }
            );
        }

      ReactDOM.render(
        <Popup metaTags={metaTags} performanceMetrics={performanceMetrics} images={images} ldJson={ldJson} />,
        document.getElementById("popup")
      );
    }, 200);
  });

function setAnchorCount(links: any) {
  if (links) {
    document.getElementById("anchor-count")!.innerText = String(links.length);
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

export { setAnchorCount };
