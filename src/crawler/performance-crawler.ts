import { Crawler } from "./interface";
import { CRAWLER_TYPE } from '../constants';

export type PERFORMANCE_DATA = {};

export class PerformanceCrawler implements Crawler {
  type: CRAWLER_TYPE = CRAWLER_TYPE.PERFORMANCE;

  public collect() {
    const performance = window.performance as any;
    console.log("performace", performance)
    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    const fcp = performance.getEntriesByType("paint")[0].startTime || 0;
    const domLoadTime = navigationEntry.domComplete;
    const windowLoadTime =
      navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
    const performanceMetrics = {
      ttfb,
      fcp,
      domLoadTime,
      windowLoadTime,
    };
    return performanceMetrics;
  }
}
