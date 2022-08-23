import {LDJSONCrawler} from "../../crawler/ld-crawler";

jest.mock('../../crawler/ld-crawler')

describe('crawler-factory works as a charm', () => {
    let instance: LDJSONCrawler;

    const collectSpy = jest.spyOn((LDJSONCrawler.prototype as any), 'collect');
    (collectSpy as jest.Mock).mockImplementation(() => {
        const scripts: Element[] = [...document.querySelectorAll("script[type='application/ld+json']")]
        return scripts.map((script: Element) => script.innerHTML)
    })

    beforeEach(() => {
        instance = new (LDJSONCrawler as any)();
        const newScriptElement = document.createElement('script');
        const newScriptElement2 = document.createElement('script')
        newScriptElement.setAttribute('type', 'application/ld+json');
        newScriptElement.innerHTML = 'console.log("SEO Extension Script created"';
        newScriptElement2.setAttribute('type', 'application/ld+json');
        document.head.appendChild(newScriptElement);
        document.head.appendChild(newScriptElement2);

    })

    afterEach(() => {
        document.head.replaceChildren()
        jest.clearAllMocks()

    });

    test('LDJSONCrawler constructor should be called', () => {
        expect(LDJSONCrawler).toBeCalled();
    })

    test('LDJSONCrawler collect method should work as expected and can get scripts wo has innerHTML', () => {
        const result = instance.collect();
        expect(collectSpy).toHaveBeenCalled();
        expect(result.length).toBe(1)
    })
})