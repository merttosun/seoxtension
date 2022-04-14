import {CHROME_MESSAGE} from "./constants";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setInterval(function () {
        // @ts-ignore
        chrome.tabs.sendMessage(tabs[0].id, { msg: CHROME_MESSAGE.META }, function (response) {
            setMetaTags(response)
        });
        // @ts-ignore
        chrome.tabs.sendMessage(tabs[0].id, { msg: CHROME_MESSAGE.LD_JSON }, function (response) {
            setLDJson(response)
        });
    }, 500)


});

function setMetaTags(meta: any) {
    if (meta) {
        // @ts-ignore
        document.getElementById("title").innerText = meta.title;
        // @ts-ignore
        document.getElementById("description").innerText = meta.description;
        // @ts-ignore
        document.getElementById("canonical").innerText = meta.canonical;
        // @ts-ignore
        document.getElementById("ogtitle").innerText = meta.ogTitle;
        // @ts-ignore
        document.getElementById("ogdescription").innerText = meta.ogDescription;
        // @ts-ignore
        document.getElementById("h1tag").innerText = meta.h1Tag;
        if (meta.ogImage) {
            var img = document.getElementById("ogimage")
            if(img == null) {
                img = document.createElement("img");
            }
            img.id = "ogimage"
            // @ts-ignore
            img.src = meta.ogImage;
            img.style.height = "150px";
            img.style.width = "150px";
            document.body.appendChild(img);
        }
    }
}

function setLDJson(jsonData: any) {
    if (jsonData && jsonData.length > 0) {
        // @ts-ignore
        document.getElementById("ld-json").innerText = JSON.stringify(jsonData)
    }
}


