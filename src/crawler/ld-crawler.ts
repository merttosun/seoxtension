/* eslint-disable @typescript-eslint/ban-types */
import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type LD_JSON_DATA = {}

// export class LDJSONCrawler implements Crawler<LD_JSON_DATA> can be implemented
export class LDJSONCrawler implements Crawler {
  public type = CRAWLER_TYPE.LD_JSON

  public collect() {
    const scripts: Element[] = [...Array.from(document.querySelectorAll('script[type=\'application/ld+json\']'))]
    return scripts.map((script: Element) => script.innerHTML)
  }
}
