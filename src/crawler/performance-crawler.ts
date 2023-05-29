import { Crawler } from './interface'
import { CRAWLER_TYPE } from '../constants'

export type PERFORMANCE_DATA = {
  ttfb?: number
  fcp?: number
  domLoadTime?: number
  windowLoadTime?: number
}

const LCP_ENTRY_TYPE = 'largest-contentful-paint'
const FID_ENTRY_TYPE = 'first-input'
const CLS_ENTRY_TYPE = 'layout-shift'

export class PerformanceCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.PERFORMANCE
  data: any = {
    [LCP_ENTRY_TYPE]: {
      value: 0,
      displayName: 'Largest Contenful Paint',
    },
    [CLS_ENTRY_TYPE]: {
      value: 0,
      displayName: 'Cumulative Layout Shift',
    },
    [FID_ENTRY_TYPE]: {
      value: 0,
      displayName: 'First Input Delay',
    },
  }

  public observe() {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === LCP_ENTRY_TYPE) {
          console.log({ entry })
          this.data[LCP_ENTRY_TYPE].value = entry.startTime
        }
        if (entry.entryType === FID_ENTRY_TYPE) {
          console.log({ entry })
          this.data[FID_ENTRY_TYPE].value = (entry as any).processingStart - entry.startTime
        }
        if (entry.entryType === CLS_ENTRY_TYPE && !(entry as any).hadRecentInput) {
          this.data[CLS_ENTRY_TYPE].value += (entry as any).value
        }
      }
      observer.disconnect()
    })

    observer.observe({ type: 'largest-contentful-paint', buffered: true })
    observer.observe({ type: 'layout-shift', buffered: true })
    observer.observe({ type: 'first-input', buffered: true })
  }

  public collect(): PERFORMANCE_DATA {
    console.log({ data: this.data })

    return {
      ttfb: this.data[FID_ENTRY_TYPE].value,
      fcp: this.data[CLS_ENTRY_TYPE].value,
      domLoadTime: this.data[LCP_ENTRY_TYPE].value,
      windowLoadTime: 0,
    }
  }
}
