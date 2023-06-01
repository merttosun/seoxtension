/* eslint-disable @typescript-eslint/no-non-null-assertion */
const LCP_ENTRY_TYPE = 'largest-contentful-paint'
const FID_ENTRY_TYPE = 'first-input'
const CLS_ENTRY_TYPE = 'layout-shift'

const CORE_WEB_VITALS_METRICS = {
  [LCP_ENTRY_TYPE]: {
    value: 0,
    displayName: 'Largest Contentful Paint',
  },
  [FID_ENTRY_TYPE]: {
    value: 0,
    displayName: 'First Input Delay',
  },
  [CLS_ENTRY_TYPE]: {
    value: 0,
    displayName: 'Cumulative Layout Shift',
  },
}

type MissingPerformanceEntryProperties = {
  value?: number
  processingStart?: number
  hadRecentInput?: boolean
}

export function prepareCoreWebVitalsMetricsFromEntries(entries: PerformanceEntryList) {
  entries.forEach((pe: PerformanceEntry & MissingPerformanceEntryProperties) => {
    if (pe.entryType === LCP_ENTRY_TYPE) {
      CORE_WEB_VITALS_METRICS[LCP_ENTRY_TYPE].value = pe.startTime
    }
    if (pe.entryType === FID_ENTRY_TYPE) {
      CORE_WEB_VITALS_METRICS[FID_ENTRY_TYPE].value = pe.processingStart! - pe.startTime
    }
    if (pe.entryType === CLS_ENTRY_TYPE && !pe.hadRecentInput) {
      CORE_WEB_VITALS_METRICS[CLS_ENTRY_TYPE].value += pe.value!
    }
  })

  return CORE_WEB_VITALS_METRICS
}
