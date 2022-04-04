chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "meta") {
            sendResponse(getMetaTags());
            return;
        }
    }
);

function getMetaTags() {

    var description = "";
    var canonical = "";
    var ogTitle = "";
    var ogDescription = ""
    var ogImage = ""
    var title = document.title;
    var h1Tag = "";
    if (document.querySelector('meta[name="description"]') != null) {
        description = document.querySelector('meta[name="description"]').content
    }
    if (document.querySelector('link[rel="canonical"') != null) {
        canonical = document.querySelector('link[rel="canonical"').href;
    }
    if (document.querySelector('meta[property="og:title"') != null) {
        ogTitle = document.querySelector('meta[property="og:title"').content;
    }
    if (document.querySelector('meta[property="og:description"') != null) {
        ogDescription = document.querySelector('meta[property="og:description"').content;
    }
    if (document.querySelector('meta[property="og:image"]') != null) {
        ogImage = document.querySelector('meta[property="og:image"]').content
    }
    if (document.querySelector('div#search-app h1') != null) {
        h1Tag = document.querySelector('div#search-app h1').textContent
    }
    return { title, description, canonical, ogTitle, ogDescription, ogImage, h1Tag }

};
