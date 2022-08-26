/**
 * @jest-environment jsdom
 */

import {LDJSONCrawler} from "../../src/crawler/ld-crawler";

describe('crawler-factory works as a charm', () => {
    let instance: LDJSONCrawler;
    let newScriptElement: HTMLScriptElement,
    newScriptElement2: HTMLScriptElement;

   beforeAll(() => {
       newScriptElement = document.createElement('script');
       newScriptElement2 = document.createElement('script')
       newScriptElement.setAttribute('type', 'application/ld+json');
       newScriptElement.innerHTML = 'SEO Extension Script created';
       newScriptElement2.setAttribute('type', 'no/ld+json');
   })

    beforeEach(() => {
        instance = new LDJSONCrawler();
        document.head.appendChild(newScriptElement);
        document.head.appendChild(newScriptElement2);
    })

    afterEach(() => {
        document.head.removeChild(newScriptElement);
        document.head.removeChild(newScriptElement2);
        jest.clearAllMocks()
    });


    test('LDJSONCrawler collect method should work as expected and can get scripts wo has innerHTML', () => {
        const result = instance?.collect();
        expect(result.length).toBe(1)
    })
})