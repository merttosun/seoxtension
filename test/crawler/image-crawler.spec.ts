/**
 * @jest-environment jsdom
 */

import {AnchorCrawler} from "../../src/crawler/anchor-crawler";
import {ImageCrawler} from "../../src/crawler/image-crawler";

describe('crawler-factory works as a charm', () => {
    let instance: AnchorCrawler;
    let newImageElement: HTMLImageElement;

    beforeAll(() => {
        newImageElement = document.createElement('img');
        newImageElement.setAttribute('style', 'width:146px;height:100%;margin-bottom:-3px');
        newImageElement.setAttribute('src', 'https://cdn.dsmcdn.com/web/logo/ty-web.svg')
        newImageElement.setAttribute('alt', 'Trendyol')
    })

    beforeEach(() => {
        instance = new ImageCrawler();
        document.head.appendChild(newImageElement);
    })

    afterEach(() => {
        document.head.removeChild(newImageElement);
        jest.clearAllMocks()
    });


    test('ImageCrawler collect method should work as expected and can get outerHtml', () => {
        const result = instance?.collect();
        expect(result?.length).toBe(1)
    })
})