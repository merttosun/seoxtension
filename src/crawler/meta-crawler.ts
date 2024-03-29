import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type ALTERNATE = {
  info?: string
  link: string
}

export type META_DATA = {
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string[]
  canonical: string
  h1Tag: string
  title: string
  alternates: ALTERNATE[]
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

    const ogImageElement = <HTMLMetaElement>document.querySelector('meta[property="og:image"]')
    const ogImage = ogImageElement ? [ogImageElement.content] : []

    const canonical = (<HTMLLinkElement>document.querySelector('link[rel="canonical"]'))?.href || ''
    const h1Tag = (<HTMLHeadingElement>document.querySelector('h1'))?.textContent || ''
    const title = document?.title

    const alternates: ALTERNATE[] = []
    document.querySelectorAll('link[rel="alternate"]').forEach((value) => {
      alternates.push({
        info: value.attributes.getNamedItem('hrefLang')?.value.toUpperCase() || undefined,
        link: value.attributes.getNamedItem('href')?.value || '',
      })
    })

    return { description, ogTitle, ogDescription, ogImage, canonical, h1Tag, title, alternates }
  }
}
