/**
 * @jest-environment jsdom
 */

import {AnchorCrawler} from "../../src/crawler/anchor-crawler";

describe('crawler-factory works as a charm', () => {
    let instance: AnchorCrawler;
    let newAnchorElement: HTMLAnchorElement;

    beforeAll(() => {
        newAnchorElement = document.createElement('a');
        newAnchorElement.setAttribute('href', 'elbise-x-c56');
    })

    beforeEach(() => {
        instance = new AnchorCrawler();
        document.head.appendChild(newAnchorElement);
    })

    afterEach(() => {
        document.head.removeChild(newAnchorElement);
        jest.clearAllMocks()
    });


    test('AnchorCrawler collect method should work as expected and can get count of anchors', () => {
        const result = instance?.collect();
        expect(result?.length).toBe(1)
    })
})