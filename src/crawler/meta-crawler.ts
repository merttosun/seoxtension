import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type META_DATA = {
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  canonical: string
  h1Tag: string
  title: string
}

export class MetaCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.META

  public collect(): META_DATA {
    const description =
      (<HTMLMetaElement>document.querySelector('meta[name="description"]'))?.content || ''
    const ogTitle =
      (<HTMLMetaElement>document.querySelector('meta[property="og:title"]'))?.content || ''
    const ogDescription =
      (<HTMLMetaElement>document.querySelector('meta[property="og:description"]'))?.content || ''
    const ogImage =
      (<HTMLMetaElement>document.querySelector('meta[property="og:image"]'))?.content || ''
    const canonical = (<HTMLLinkElement>document.querySelector('link[rel="canonical"]'))?.href || ''
    const h1Tag = (<HTMLHeadingElement>document.querySelector('h1'))?.textContent || ''
    const title = document.title

    return { description, ogTitle, ogDescription, ogImage, canonical, h1Tag, title }
  }
}
