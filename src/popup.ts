import {CHROME_MESSAGE} from "./constants";

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    setInterval(function () {
        chrome.tabs.sendMessage(tabs[0].id!, {msg: CHROME_MESSAGE.META}, function (response) {
            setMetaTags(response)
        });
        chrome.tabs.sendMessage(tabs[0].id!, {msg: CHROME_MESSAGE.LD_JSON}, function (response) {
            setLDJson(response)
        });
        chrome.tabs.sendMessage(tabs[0].id!, {msg: CHROME_MESSAGE.PERFORMANCE}, function (response) {
                setPerformanceMetrics(response);
            }
        );

    }, 500)
});

chrome.webRequest.onCompleted.addListener(function (details) {
        setStatusCode(details)
        //add you new required feature
    },
    {
        urls: ["<all_urls>"]
    },
    ["responseHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(details => {
        setRedirectionUrl(details)
        //add you new required feature
    },
    {
        urls: ["<all_urls>"]
    },
    ["responseHeaders"]);

function setMetaTags(meta: any) {
    if (meta) {
        document.getElementById("title")!.innerText = meta.title;
        document.getElementById("description")!.innerText = meta.description;
        document.getElementById("canonical")!.innerText = meta.canonical;
        document.getElementById("ogtitle")!.innerText = meta.ogTitle;
        document.getElementById("ogdescription")!.innerText = meta.ogDescription;
        document.getElementById("h1tag")!.innerText = meta.h1Tag;
        if (meta.ogImage) {
            let img = <HTMLImageElement>document.getElementById("ogimage");
            if (img == null) {
                img = <HTMLImageElement>document.createElement("img");
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
    if (jsonData) {
        document.getElementById("ld-json")!.innerText = JSON.stringify(jsonData)
    }
}

function setStatusCode(details: chrome.webRequest.WebResponseCacheDetails) {
    document.getElementById("statusCode")!.innerText = String(details.statusCode);

}

function setRedirectionUrl(details: chrome.webRequest.WebResponseHeadersDetails) {
    details.responseHeaders?.filter(obj => {
        if (obj.name == "location") {
            document.getElementById("redirection-info")!.innerText = String(obj.value);
        }
    });
}

function setPerformanceMetrics(performanceMetrics: any) {
    if (performanceMetrics) {
        const {ttfb, fcp, domLoadTime, windowLoadTime} = performanceMetrics;
        document.getElementById("ttfb")!.innerText = ttfb;
        document.getElementById("fcp")!.innerText = fcp;
        document.getElementById("dom-load-time")!.innerText = domLoadTime;
        document.getElementById("window-load-time")!.innerText = windowLoadTime;
    }
}

export {setPerformanceMetrics, setMetaTags, setLDJson}