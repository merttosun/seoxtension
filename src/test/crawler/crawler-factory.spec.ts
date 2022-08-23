import {CrawlerFactory} from '../../crawler/crawler-factory';
import {MetaCrawler} from '../../crawler/meta-crawler';
import {LDJSONCrawler} from '../../crawler/ld-crawler';
import {PerformanceCrawler} from '../../crawler/performance-crawler';
import {CRAWLER_TYPE} from "../../constants";
import {Crawler} from '../../crawler/interface';

jest.mock('../../crawler/crawler-factory');
jest.mock('../../crawler/meta-crawler');
jest.mock('../../crawler/ld-crawler');
jest.mock('../../crawler/performance-crawler');


describe('crawler-factory works as a charm', () => {
  let instance: CrawlerFactory;
  let crawlers = new Map<CRAWLER_TYPE, Crawler>;

  const constructorSpy = jest.spyOn((CrawlerFactory.prototype as any), 'constructor');
  (constructorSpy as jest.Mock).mockImplementation(() => {
    crawlers.set(CRAWLER_TYPE.LD_JSON, new (LDJSONCrawler as any)());
    crawlers.set(CRAWLER_TYPE.META, new (MetaCrawler as any)());
    crawlers.set(CRAWLER_TYPE.PERFORMANCE, new (PerformanceCrawler as any)());
  })

  beforeEach(() => {
    instance = new (CrawlerFactory as any)();
  })

  afterEach(() => {
    (CrawlerFactory as any).mockClear();
    (LDJSONCrawler as any).mockClear();
    (PerformanceCrawler as any).mockClear();
    (MetaCrawler as any).mockClear();
    crawlers.delete(CRAWLER_TYPE.LD_JSON)
    crawlers.delete(CRAWLER_TYPE.PERFORMANCE)
    crawlers.delete(CRAWLER_TYPE.META)
    jest.clearAllMocks()
  });

  test('CrawlerFactory constructor should be called', () => {
    expect(CrawlerFactory).toHaveBeenCalled();
  })

  test('CrawlerFactory should call crawlers constructors and set to crawlers map', () => {
    expect(LDJSONCrawler).toHaveBeenCalled()
    expect(PerformanceCrawler).toHaveBeenCalled()
    expect(MetaCrawler).toHaveBeenCalled()
    expect(crawlers.has(CRAWLER_TYPE.PERFORMANCE)).toBeTruthy()
  })
})