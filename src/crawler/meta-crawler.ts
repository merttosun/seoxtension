import {Crawler} from "./interface";
import {CRAWLER_TYPE} from "../constants";

export type META_DATA = {
    title: string,
    description: string,
    canonical: string,
    ogTitle: string,
    ogDescription: string,
    ogImage: string,
    h1Tag: string
}

export class MetaCrawler implements Crawler {
    type: CRAWLER_TYPE = CRAWLER_TYPE.META;

    public collect(): META_DATA {
        let description = "";
        let canonical = "";
        let ogTitle = "";
        let ogDescription = "";
        let ogImage = "";
        const title = document.title;
        let h1Tag = "";
        if (document.querySelector('meta[name="description"]') != null) {
            // @ts-ignore
            description = document.querySelector('meta[name="description"]').content
        }
        if (document.querySelector('link[rel="canonical"') != null) {
            // @ts-ignore
            canonical = document.querySelector('link[rel="canonical"').href;
        }
        if (document.querySelector('meta[property="og:title"') != null) {
            // @ts-ignore
            ogTitle = document.querySelector('meta[property="og:title"').content;
        }
        if (document.querySelector('meta[property="og:description"') != null) {
            // @ts-ignore
            ogDescription = document.querySelector('meta[property="og:description"').content;
        }
        if (document.querySelector('meta[property="og:image"]') != null) {
            // @ts-ignore
            ogImage = document.querySelector('meta[property="og:image"]').content
        }
        if (document.querySelector('h1') != null) {
            // @ts-ignore
            h1Tag = document.querySelector('h1').textContent
        }
        return { title, description, canonical, ogTitle, ogDescription, ogImage, h1Tag }

    };

}



