import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type PERFORMANCE_DATA = {
  ttfb?: number
  fcp?: number
  domLoadTime?: number
  windowLoadTime?: number
}

export class PerformanceCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.PERFORMANCE

  public collect(): PERFORMANCE_DATA {
    const performance = window.performance as any
    let navigationEntry
    let ttfb,
      fcp,
      domLoadTime,
      windowLoadTime = 0
    if (
      Array.isArray(performance.getEntriesByType('navigation')) &&
      performance.getEntriesByType('navigation').length > 0
    ) {
      navigationEntry = performance.getEntriesByType('navigation')[0]
      const { loadEventEnd, loadEventStart, responseStart, requestStart, domComplete } =
        navigationEntry
      windowLoadTime = loadEventEnd - loadEventStart
      ttfb = responseStart - requestStart
      domLoadTime = domComplete
    }
    if (
      Array.isArray(performance.getEntriesByType('paint')) &&
      performance.getEntriesByType('paint').length > 0
    ) {
      fcp = performance.getEntriesByType('paint')[0].startTime || 0
    }

    return {
      ttfb,
      fcp,
      domLoadTime,
      windowLoadTime,
    }
  }
}
