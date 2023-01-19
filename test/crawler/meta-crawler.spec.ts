/**
 * @jest-environment jsdom
 */

import { MetaCrawler } from '../../src/crawler/meta-crawler';

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

    test('meta crawler collect method works as expected', () => {
      const result = instance.collect()
      expect(result).toEqual({
        title: 'SEO Extension Tests',
        description: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        canonical: '',
        alternates: [],
        h1Tag: 'SEO Heading',
      })
    })
})
