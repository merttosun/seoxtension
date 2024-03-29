/* eslint-disable @typescript-eslint/no-non-null-assertion */
const LCP_ENTRY_TYPE = 'largest-contentful-paint'
const FID_ENTRY_TYPE = 'first-input'
const LS_ENTRY_TYPE = 'layout-shift'

export const LCP_SHORT_NAME: ENTRY_NAME = 'LCP'
export const FID_SHORT_NAME: ENTRY_NAME = 'FID'
export const CLS_SHORT_NAME: ENTRY_NAME = 'CLS'

type ENTRY_NAME = 'LCP' | 'FID' | 'CLS'

type MissingPerformanceEntryProperties = {
  value?: number
  processingStart?: number
  hadRecentInput?: boolean
}

type SpeacialPerformanceEntry = PerformanceEntry & MissingPerformanceEntryProperties

export type Status = 'good' | 'needImprovement' | 'bad'

type Thresholds = {
  good: { start: number; end: number; range: number }
  needImprovement: { start: number; end: number; range: number }
  bad: { start: number; end: number; range: number }
}

export type CORE_WEB_VITALS_DATA = {
  [LCP_SHORT_NAME]: {
    value: number
    status: Status
    thresholds: Thresholds
  }
  [FID_SHORT_NAME]: {
    value: number
    status: Status
    thresholds: Thresholds
  }
  [CLS_SHORT_NAME]: {
    value: number
    status: Status
    thresholds: Thresholds
  }
}

export const DEFAULT_CORE_WEB_VITALS_METRICS: CORE_WEB_VITALS_DATA = {
  [LCP_SHORT_NAME]: {
    value: 0,
    status: 'good',
    thresholds: {
      good: { start: 0, end: 2.5, range: 2.5 },
      needImprovement: { start: 2.5, end: 4, range: 1.5 },
      bad: { start: 4, end: 5, range: 1 },
    },
  },
  [FID_SHORT_NAME]: {
    value: 0,
    status: 'good',
    thresholds: {
      good: { start: 0, end: 100, range: 100 },
      needImprovement: { start: 100, end: 300, range: 200 },
      bad: { start: 300, end: 500, range: 200 },
    },
  },
  [CLS_SHORT_NAME]: {
    value: 0,
    status: 'good',
    thresholds: {
      good: { start: 0, end: 0.1, range: 0.1 },
      needImprovement: { start: 0.1, end: 0.25, range: 0.15 },
      bad: { start: 0.25, end: 0.5, range: 0.25 },
    },
  },
}

const data = createInitialCoreWebVitalsData()

export function prepareCoreWebVitalsMetricsFromEntries(entries: SpeacialPerformanceEntry[]) {
  data[CLS_SHORT_NAME].value = 0.0
  entries.forEach((pe: PerformanceEntry & MissingPerformanceEntryProperties) => {
    if (pe.entryType === LCP_ENTRY_TYPE) {
      data[LCP_SHORT_NAME].value = pe.startTime / 1000
      data[LCP_SHORT_NAME].status = getStatusFromValue(LCP_SHORT_NAME)
    }
    if (pe.entryType === FID_ENTRY_TYPE) {
      data[FID_SHORT_NAME].value = pe.processingStart! - pe.startTime
      data[FID_SHORT_NAME].status = getStatusFromValue(FID_SHORT_NAME)
    }
    if (pe.entryType === LS_ENTRY_TYPE && !pe.hadRecentInput) {
      data[CLS_SHORT_NAME].value = data[CLS_SHORT_NAME].value + pe.value!
      data[CLS_SHORT_NAME].status = getStatusFromValue(CLS_SHORT_NAME)
    }
  })

  return data
}

export function createInitialCoreWebVitalsData(): CORE_WEB_VITALS_DATA {
  return JSON.parse(JSON.stringify(DEFAULT_CORE_WEB_VITALS_METRICS))
}

function getStatusFromValue(entryName: ENTRY_NAME): Status {
  if (data[entryName].value < data[entryName].thresholds.good.end) {
    return 'good'
  } else if (data[entryName].value < data[entryName].thresholds.needImprovement.end) {
    return 'needImprovement'
  } else {
    return 'bad'
  }
}
