import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'
import { prepareCoreWebVitalsMetricsFromEntries } from '../utils/web-vitals-modifier'

export type PERFORMANCE_DATA = {
  ttfb?: number
  fcp?: number
  domLoadTime?: number
  windowLoadTime?: number
}

export class PerformanceCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.PERFORMANCE

  public collect() {
    const observer = new PerformanceObserver(async (entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log({ entry })
      }
    })

    observer.observe({ type: 'largest-contentful-paint', buffered: true })
    observer.observe({ type: 'layout-shift', buffered: true })
    observer.observe({ type: 'first-input', buffered: true })

    const records = observer.takeRecords()
    observer.disconnect()

    return {
      coreWebVitalsMetrics: prepareCoreWebVitalsMetricsFromEntries(records),
    }
  }
}
