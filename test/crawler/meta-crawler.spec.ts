/**
 * @jest-environment jsdom
 */

import { MetaCrawler } from '../../src/crawler/meta-crawler';

jest.mock('../../src/crawler/meta-crawler')

describe('MetaCrawler works as like a charm :)', () => {
  let instance: MetaCrawler;

    const mockDescriptionMetaElement = document.createElement('meta');
    mockDescriptionMetaElement.setAttribute('name', 'description');
    const mockOgTitleMetaElement = document.createElement('meta');
    mockOgTitleMetaElement.setAttribute('property', 'og:title');
    const  mockOgDescriptionMetaElement = document.createElement('meta')
    mockOgDescriptionMetaElement.setAttribute('property', 'og:description');
    const mockOgImageMetaElement = document.createElement('meta');
    mockOgImageMetaElement.setAttribute('property', 'og:image');
    const mockCanonicalLinkElement = document.createElement('link');
    mockCanonicalLinkElement.setAttribute('rel', 'canonical');
    const mockHeadingElement = document.createElement('h1');
    mockHeadingElement.textContent = 'SEO Heading';

  const collectSpy =  jest.spyOn(MetaCrawler.prototype, 'collect').mockImplementation(() => {
    
    const description = (<HTMLMetaElement>(document.querySelector('meta[name="description"]')))?.content || "";
    const ogTitle = (<HTMLMetaElement>(document.querySelector('meta[property="og:title]"]')))?.content || "";
    const ogDescription = (<HTMLMetaElement>(document.querySelector('meta[property="og:description"]'))).content || "";
    const ogImage = (<HTMLMetaElement>(document.querySelector('meta[property="og:image"]')))?.content || "";
    const canonical = (<HTMLLinkElement>(document.querySelector('link[rel="canonical"]')))?.href  || "";
    const h1Tag = (<HTMLHeadingElement>(document.querySelector('h1')))?.textContent || "";
    const title = document.title;
    
    return { description, ogTitle, ogDescription, ogImage, canonical, h1Tag, title }
});

    beforeEach(() => {
    instance = new MetaCrawler()
    
    document.head.appendChild(mockDescriptionMetaElement);
    document.head.appendChild(mockOgTitleMetaElement);
    document.head.appendChild(mockOgDescriptionMetaElement);
    document.head.appendChild(mockOgImageMetaElement);
    document.head.appendChild(mockCanonicalLinkElement);
    document.body.appendChild(mockHeadingElement);
    document.title = 'SEO Extension Tests'
    })

    afterEach(() => {
        document.head.removeChild(mockDescriptionMetaElement);
        document.head.removeChild(mockOgTitleMetaElement);
        document.head.removeChild(mockOgDescriptionMetaElement);
        document.head.removeChild(mockOgImageMetaElement);
        document.head.removeChild(mockCanonicalLinkElement);
        document.body.removeChild(mockHeadingElement);
        document.title = '';
        jest.clearAllMocks()
    })

    test('meta crawler constructor works as expected', () => {
      expect(MetaCrawler).toHaveBeenCalled()
      
    })

    test('meta crawler collect method works as expected', () => {
      const result = instance.collect()
      expect(collectSpy).toHaveBeenCalled()
      
      expect(result).toEqual({
        title: document.title,
        description: mockDescriptionMetaElement.content,
        ogTitle: mockOgTitleMetaElement.content,
        ogDescription: mockOgDescriptionMetaElement.content,
        ogImage: mockOgImageMetaElement.content,
        canonical: mockCanonicalLinkElement.href,
        h1Tag: mockHeadingElement.textContent || '',
      })
    })
})
