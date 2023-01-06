import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type LINK_DATA = string[]

export class AnchorCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.ANCHOR

  public collect(): LINK_DATA {
    const links: HTMLAnchorElement[] = [...document.querySelectorAll('a')]
    return links.map((link: HTMLAnchorElement) => link.href)
  }
}
