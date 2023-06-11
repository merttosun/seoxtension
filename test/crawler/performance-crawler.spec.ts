import { PerformanceCrawler } from '../../src/crawler/performance-crawler'

describe('PerformanceCrawler works like a charm', () => {
  let instance: PerformanceCrawler

  beforeEach(() => {
    instance = new PerformanceCrawler()
    const mockPerformanceObserver = jest.fn()
    mockPerformanceObserver.mockReturnValue({
      observe: () => null,
    })
    Object.defineProperty(global, 'PerformanceObserver', new mockPerformanceObserver)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('PerformanceCrawler collect method works as expected', () => {
    const mockResult = {
      fid: 0,
      lcp: 0,
      cls: 0,
    }

    const result = instance.collect()
    expect(result).toEqual(mockResult)
  })
})
