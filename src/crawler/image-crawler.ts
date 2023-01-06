import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type IMAGE_DATA = string[]

export class ImageCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.IMAGE

  public collect(): IMAGE_DATA {
    const images = [...document.images]
    return images.map((image) => image.src)
  }
}
