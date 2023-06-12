/**
 * @jest-environment jsdom
 */

import {
  CLS_SHORT_NAME,
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

  test('prepareCoreWebVitalsMetricsFromEntries should return correct status for values (first variation)', () => {
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

  test('prepareCoreWebVitalsMetricsFromEntries should return correct status for values (second variation)', () => {
    const res = prepareCoreWebVitalsMetricsFromEntries([
      {
        entryType: 'largest-contentful-paint',
        startTime: 2700,
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
        processingStart: 109,
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
        value: 0.06,
        toJSON() {
          return {}
        },
      },
    ])

    expect(res[LCP_SHORT_NAME].status).toEqual('needImprovement')
    expect(res[FID_SHORT_NAME].status).toEqual('good')
    expect(res[CLS_SHORT_NAME].status).toEqual('needImprovement')

    expect(res[LCP_SHORT_NAME].value).toEqual(2.7)
    expect(res[FID_SHORT_NAME].value).toEqual(99)
    expect(res[CLS_SHORT_NAME].value).toEqual(0.11)
  })

  test('prepareCoreWebVitalsMetricsFromEntries should return correct status for values (third variation)', () => {
    const res = prepareCoreWebVitalsMetricsFromEntries([
      {
        entryType: 'largest-contentful-paint',
        startTime: 5500,
        duration: 500,
        name: '',
        toJSON() {
          return {}
        },
      },
      {
        entryType: 'first-input',
        startTime: 5,
        duration: 30,
        processingStart: 335,
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
        value: 0.01,
        toJSON() {
          return {}
        },
      },
    ])

    expect(res[LCP_SHORT_NAME].status).toEqual('bad')
    expect(res[FID_SHORT_NAME].status).toEqual('bad')
    expect(res[CLS_SHORT_NAME].status).toEqual('good')

    expect(res[LCP_SHORT_NAME].value).toEqual(5.5)
    expect(res[FID_SHORT_NAME].value).toEqual(330)
    expect(res[CLS_SHORT_NAME].value).toEqual(0.01)
  })
})
