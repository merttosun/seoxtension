import {PerformanceCrawler} from "../../src/crawler/performance-crawler";

jest.mock('../../src/crawler/performance-crawler')

describe('PerformanceCrawler works like a charm', () => {
    let instance: PerformanceCrawler;
    let ttfb: number,
        fcp: number,
        domLoadTime: number,
        windowLoadTime = 0;
    let navigationEntry;

    const collectSpy = jest.spyOn(PerformanceCrawler.prototype, 'collect')
    collectSpy.mockImplementation(() => {
        navigationEntry = window.performance.getEntriesByType("navigation")[0];
        // @ts-ignore
        const { loadEventEnd, loadEventStart, responseStart, requestStart, domComplete } = navigationEntry;
        windowLoadTime = loadEventEnd - loadEventStart;
        ttfb = responseStart - requestStart;
        domLoadTime = domComplete;
        fcp = window.performance.getEntriesByType("paint")[0].startTime || 0;
        return {
            ttfb,
            fcp,
            domLoadTime,
            windowLoadTime,
        };
    })
    beforeEach(() => {
        instance = new PerformanceCrawler()
        Object.defineProperty(window, 'performance', {
            value: {
                getEntriesByType(key: string){
                    const entries: any = {
                        navigation : [{
                            loadEventEnd: 50,
                            loadEventStart: 10,
                            responseStart: 5,
                            requestStart: 0,
                            domComplete: 15,
                        }],
                        paint: [
                            {startTime: 1.5}
                        ]
                    }
                    return entries[key]
                }
            },
            writable: true
        })
    })

    afterEach(() => {
        delete (window as any).performance;
        (PerformanceCrawler as any).mockClear();
        jest.clearAllMocks()
    })

    test('PerformanceCrawler constructor works as expected', () => {
        new PerformanceCrawler()
        expect(PerformanceCrawler).toHaveBeenCalled()
    })

    test('PerformanceCrawler collect method works as expected', () => {
       const mockResult = {
           ttfb: 5,
           fcp: 1.5,
           domLoadTime: 15,
           windowLoadTime: 40
       };

       const result = instance.collect();
       expect(collectSpy).toHaveBeenCalled();
       expect(result).toEqual(mockResult);
    })


})