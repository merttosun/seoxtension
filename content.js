chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse(getMetaTags());
    }
);

function getMetaTags() {

    var description = "";
    var canonical = "";
    var ogImage = ""
    var title = document.title;
    if (document.querySelector('meta[name="description"]') != null) {
        description = document.querySelector('meta[name="description"]').content
    }
    if (document.querySelector('link[rel="canonical"') != null) {
        canonical = document.querySelector('link[rel="canonical"').href;
    }
    if (document.querySelector('meta[property="og:image"]') != null) {
        ogImage = document.querySelector('meta[property="og:image"]').content
    }

    return { title, description, canonical, ogImage }

};
