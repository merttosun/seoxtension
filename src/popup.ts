import {CHROME_MESSAGE} from "./constants";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setInterval(function () {
        chrome.tabs.sendMessage(tabs[0].id!, { msg: CHROME_MESSAGE.META }, function (response) {
            setMetaTags(response)
        });
        chrome.tabs.sendMessage(tabs[0].id!, { msg: CHROME_MESSAGE.LD_JSON }, function (response) {
            setLDJson(response)
        });
        chrome.tabs.sendMessage(tabs[0].id!, { msg: CHROME_MESSAGE.PERFORMANCE }, function (response) {
            setPerformanceMetrics(response);
        }
      );
    }, 500)


});

function setMetaTags(meta: any) {
    if (meta) {
        document.getElementById("title")!.innerText = meta.title;
        document.getElementById("description")!.innerText = meta.description;
        document.getElementById("canonical")!.innerText = meta.canonical;
        document.getElementById("ogtitle")!.innerText = meta.ogTitle;
        document.getElementById("ogdescription")!.innerText = meta.ogDescription;
        document.getElementById("h1tag")!.innerText = meta.h1Tag;
        if (meta.ogImage) {
            var img = document.getElementById("ogimage")! as HTMLImageElement
            if(img == null) {
                img = document.createElement("img")! as HTMLImageElement;
            }
            img.id = "ogimage"
            img.src = meta.ogImage;
            img.style.height = "150px";
            img.style.width = "150px";
            document.body.appendChild(img);
        }
    }
}

function setLDJson(jsonData: any) {
    if (jsonData && jsonData.length > 0) {
        document.getElementById("ld-json")!.innerText = JSON.stringify(jsonData)
    }
}


function setPerformanceMetrics(performanceMetrics: any) {
    if (performanceMetrics) {
      const { ttfb, fcp, domLoadTime, windowLoadTime } = performanceMetrics;
      document.getElementById("ttfb")!.innerText = ttfb;
      document.getElementById("fcp")!.innerText = fcp;
      document.getElementById("dom-load-time")!.innerText = domLoadTime;
      document.getElementById("window-load-time")!.innerText = windowLoadTime;
    }
  }
