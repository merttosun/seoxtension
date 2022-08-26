import {PerformanceCrawler} from "../../src/crawler/performance-crawler";

describe('PerformanceCrawler works like a charm', () => {
    let instance: PerformanceCrawler;

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
        jest.clearAllMocks()
    })

    test('PerformanceCrawler collect method works as expected', () => {
       const mockResult = {
           ttfb: 5,
           fcp: 1.5,
           domLoadTime: 15,
           windowLoadTime: 40
       };

       const result = instance.collect();
       expect(result).toEqual(mockResult)
    })


})