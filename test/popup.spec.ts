import {setMetaTags, setLDJson, setPerformanceMetrics} from '../src/popup'
import mocks from "./mocks/popup";

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
         mockLDJsonElement: HTMLScriptElement;
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
         mockLDJsonElement = document.createElement('script');

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

         mockTitle.innerText = 'Seo Extension MockTitle';
         mockDescription.innerText = 'Seo Extension mockDescription';
         mockCanonical.innerText = 'Seo Extension mockCanonical';
         mockOgTitle.innerText = 'Seo Extension mockOgTitle';
         mockOgDescription.innerText = 'Seo Extension mockOgDescription';
         mockOgImage.src = 'http://localhost:1111/seo-extension-image.jpg'
         mockHeadingElement.innerText = 'Seo Extension mockHeadingElement';
     })

    beforeEach(() => {
         mockSetMetaTags = jest.fn(() => setMetaTags(mocks.meta))
         mockSetLDJson = jest.fn(() => setLDJson(mocks.jsonData))
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

        jest.clearAllMocks()
    })

    test('setMetaTags should set meta properties to elements', () => {
        setMetaTags(mocks.meta)
        const ogImage = document.getElementById("ogimage") as HTMLImageElement
        expect(ogImage?.src).toBe('http://localhost:1111/seo-extension-image.jpg')
    })

    test('setMetaTags should set meta properties to elements', () => {
        setPerformanceMetrics(mocks.performanceMetrics)
    })

    test('setMetaTags should set meta properties to elements', () => {
        setLDJson(mocks.jsonData)
    })

})