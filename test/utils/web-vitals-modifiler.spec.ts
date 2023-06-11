/**
 * @jest-environment jsdom
 */

import {
  CLS_SHORT_NAME,
  CORE_WEB_VITALS_DATA,
  DEFAULT_CORE_WEB_VITALS_METRICS,
  FID_SHORT_NAME,
  LCP_SHORT_NAME,
  prepareCoreWebVitalsMetricsFromEntries,
} from '../../src/utils/web-vitals-modifier'

describe('crawler-factory works as a charm', () => {
  test('prepareCoreWebVitalsMetricsFromEntries should return default metrics', () => {
    const res = prepareCoreWebVitalsMetricsFromEntries([])

    expect(res[LCP_SHORT_NAME].status).toEqual('good')
    expect(res[FID_SHORT_NAME].status).toEqual('good')
    expect(res[CLS_SHORT_NAME].status).toEqual('good')

    expect(res[LCP_SHORT_NAME].value).toEqual(0)
    expect(res[FID_SHORT_NAME].value).toEqual(0)
    expect(res[CLS_SHORT_NAME].value).toEqual(0)
  })

  test('prepareCoreWebVitalsMetricsFromEntries should return correct status for values', () => {
    const res = prepareCoreWebVitalsMetricsFromEntries([
      {
        entryType: 'largest-contentful-paint',
        startTime: 1000,
        duration: 500,
        name: '',
        toJSON() {
          return {}
        },
      },
      {
        entryType: 'first-input',
        startTime: 10,
        duration: 30,
        processingStart: 150,
        name: '',
        toJSON() {
          return {}
        },
      },
      {
        entryType: 'layout-shift',
        startTime: 0,
        duration: 0,
        processingStart: 0,
        name: '',
        value: 0.05,
        toJSON() {
          return {}
        },
      },
      {
        entryType: 'layout-shift',
        startTime: 0,
        duration: 0,
        processingStart: 0,
        name: '',
        value: 0.26,
        toJSON() {
          return {}
        },
      },
    ])

    expect(res[LCP_SHORT_NAME].status).toEqual('good')
    expect(res[FID_SHORT_NAME].status).toEqual('needImprovement')
    expect(res[CLS_SHORT_NAME].status).toEqual('bad')

    expect(res[LCP_SHORT_NAME].value).toEqual(1)
    expect(res[FID_SHORT_NAME].value).toEqual(140)
    expect(res[CLS_SHORT_NAME].value).toEqual(0.31)
  })
})
