import { setMetaTags, setLDJson, setPerformanceMetrics } from '../src/functions'
import mocks from "./mocks/popup";
import mock = jest.mock;

jest.mock('crawler/ld-crawler')

describe('popup works like a charm', () => {
    let mockSetMetaTags: jest.Mock;
    let mockSetLDJson: jest.Mock;
    let mockSetPerformanceMetrics: jest.Mock;
    let mockTitle: HTMLTitleElement,
        mockDescription: HTMLMetaElement,
        mockCanonical: HTMLLinkElement,
        mockOgTitle: HTMLMetaElement,
        mockOgDescription: HTMLMetaElement,
        mockHeadingElement: HTMLHeadingElement,
        mockOgImage: HTMLImageElement,
        mockLDJsonElement: HTMLParagraphElement;
    ;
    let mockTTFB: HTMLSpanElement, mockFCP: HTMLSpanElement, mockDOMLoadTime: HTMLSpanElement, mockWindowLoadTime: HTMLSpanElement;

    beforeAll(() => {
        mockTTFB = document.createElement('span');
        mockFCP = document.createElement('span');
        mockDOMLoadTime = document.createElement('span');
        mockWindowLoadTime = document.createElement('span');

        mockTitle = document.createElement('title');
        mockDescription = document.createElement('meta');
        mockCanonical = document.createElement('link');
        mockOgTitle = document.createElement('meta');
        mockOgDescription = document.createElement('meta');
        mockOgImage = document.createElement('img');
        mockHeadingElement = document.createElement('h1');
        mockLDJsonElement = document.createElement('p');

        mockTTFB.id = 'ttfb';
        mockFCP.id = 'fcp';
        mockDOMLoadTime.id = 'dom-load-time';
        mockWindowLoadTime.id = 'window-load-time';

        mockTitle.id = 'title';
        mockDescription.id = 'description'
        mockCanonical.id = 'canonical'
        mockOgTitle.id = 'ogtitle',
            mockOgDescription.id = 'ogdescription';
        mockOgImage.id = 'ogimage';
        mockHeadingElement.id = 'h1tag';
        mockLDJsonElement.id = 'ld-json';

    })

    beforeEach(() => {
        mockSetMetaTags = jest.fn(() => setMetaTags(mocks.meta))
        mockSetLDJson = jest.fn(() => setLDJson(mocks.ldJsonData))
        mockSetPerformanceMetrics = jest.fn(() => setPerformanceMetrics(mocks.performanceMetrics))

        document.head.appendChild(mockCanonical)
        document.head.appendChild(mockTitle)
        document.head.appendChild(mockOgTitle)
        document.head.appendChild(mockOgDescription)
        document.head.appendChild(mockDescription)
        document.body.appendChild(mockHeadingElement)

        document.body.appendChild(mockTTFB)
        document.body.appendChild(mockFCP)
        document.body.appendChild(mockDOMLoadTime)
        document.body.appendChild(mockWindowLoadTime)

        document.body.appendChild(mockLDJsonElement)

    })

    afterEach(() => {
        mockSetLDJson.mockClear()
        mockSetMetaTags.mockClear()
        mockSetPerformanceMetrics.mockClear()

        document.head.removeChild(mockCanonical)
        document.head.removeChild(mockTitle)
        document.head.removeChild(mockDescription)
        document.head.removeChild(mockOgTitle)
        document.head.removeChild(mockOgDescription)
        document.body.removeChild(mockHeadingElement)

        document.body.removeChild(mockTTFB)
        document.body.removeChild(mockFCP)
        document.body.removeChild(mockDOMLoadTime)
        document.body.removeChild(mockWindowLoadTime)

        document.body.removeChild(mockLDJsonElement)

        jest.clearAllMocks()
    })

    test('setMetaTags should set meta properties to elements', () => {
        setMetaTags(mocks.meta)
        const ogImage = document.getElementById("ogimage") as HTMLImageElement
        expect(ogImage?.src).toBe('http://localhost:1111/seo-extension-image.jpg')
    })

    test('setPerformanceMetrics should set performance properties to elements', () => {
        setPerformanceMetrics(mocks.performanceMetrics)
        const ttfb = document.getElementById("ttfb") as HTMLSpanElement
        const fcp = document.getElementById("fcp") as HTMLSpanElement
        const window_load_time = document.getElementById("window-load-time") as HTMLSpanElement
        const dom_load_time = document.getElementById("dom-load-time") as HTMLSpanElement

        expect(ttfb.innerText).toBe(mocks.performanceMetrics.ttfb)
        expect(fcp.innerText).toBe(mocks.performanceMetrics.fcp)
        expect(dom_load_time.innerText).toBe(mocks.performanceMetrics.domLoadTime)
        expect(window_load_time.innerText).toBe(mocks.performanceMetrics.windowLoadTime)

    })

    test('setLDJson should set ld-json properties to elements', () => {
        setLDJson(mocks.ldJsonData)
        const ld_json = document.getElementById("ld-json") as HTMLParagraphElement;
        expect(ld_json.innerText).toBe(JSON.stringify(mocks.ldJsonData))
    })

})