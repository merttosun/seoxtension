/**
 * @jest-environment jsdom
 */

import {LDJSONCrawler} from "../../src/crawler/ld-crawler";

jest.mock('../../src/crawler/ld-crawler')

describe('crawler-factory works as a charm', () => {
    let instance: LDJSONCrawler;
    let newScriptElement: HTMLScriptElement,
    newScriptElement2: HTMLScriptElement;

   beforeAll(() => {
        newScriptElement = document.createElement('script');
        newScriptElement2 = document.createElement('script')
       newScriptElement.setAttribute('type', 'application/ld+json');
       newScriptElement.innerHTML = 'console.log("SEO Extension Script created"';
       newScriptElement2.setAttribute('type', 'application/ld+json');
   })

    const collectSpy = jest.spyOn((LDJSONCrawler.prototype as any), 'collect');
    (collectSpy as jest.Mock).mockImplementation(() => {
        const scripts: Element[] = [...document.querySelectorAll("script[type='application/ld+json']")]
        return scripts.map((script: Element) => script.innerHTML)
    })

    beforeEach(() => {
        instance = new LDJSONCrawler();
        document.head.appendChild(newScriptElement);
        document.head.appendChild(newScriptElement2);
    })

    afterEach(() => {
        document.head.replaceChildren();
        jest.clearAllMocks()
    });

    test('LDJSONCrawler constructor should be called', () => {
        expect(LDJSONCrawler).toHaveBeenCalled();
    })

    test.skip('LDJSONCrawler collect method should work as expected and can get scripts wo has innerHTML', () => {
        const result = instance?.collect();
        expect(collectSpy).toHaveBeenCalled();
        expect(result?.length).toBe(1)
    })
})