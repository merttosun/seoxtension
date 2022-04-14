import {CrawlerFactory} from "./crawler/crawler-factory";
import {CHROME_MESSAGE, CRAWLER_TYPE} from "./constants";

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg === CHROME_MESSAGE.META) return sendResponse(CrawlerFactory.get(CRAWLER_TYPE.META).collect());
        if (request.msg === CHROME_MESSAGE.LD_JSON) return sendResponse(CrawlerFactory.get(CRAWLER_TYPE.LD_JSON).collect());
    }
);


