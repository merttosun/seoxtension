import { PerformanceCrawler } from '../../src/crawler/performance-crawler'

describe('PerformanceCrawler works like a charm', () => {
  let instance: PerformanceCrawler

  beforeEach(() => {
    instance = new PerformanceCrawler()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('PerformanceCrawler collect method works as expected', () => {
    const result = instance.collect()
    const resultKeys = Object.keys(result.coreWebVitalsMetrics)
    
    expect(resultKeys.length).toEqual(3)
    expect(resultKeys[0]).toEqual('LCP')
    expect(resultKeys[1]).toEqual('FID')
    expect(resultKeys[2]).toEqual('CLS')

    expect(result.coreWebVitalsMetrics.LCP.status).toEqual('good')
    expect(result.coreWebVitalsMetrics.FID.status).toEqual('good')
    expect(result.coreWebVitalsMetrics.CLS.status).toEqual('good')
  })
})
