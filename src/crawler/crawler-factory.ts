import {CRAWLER_TYPE} from "../constants";
import {Crawler} from "./interface";
import {LDJSONCrawler} from "./ld-crawler";
import {MetaCrawler} from "./meta-crawler";
import { PerformanceCrawler } from './performance-crawler';


export class CrawlerFactory {

    private static instance: CrawlerFactory | null = null;
    private crawlers: Map<CRAWLER_TYPE, Crawler>;

    private constructor() {
        this.crawlers = new Map<CRAWLER_TYPE, Crawler>();
        this.crawlers.set(CRAWLER_TYPE.LD_JSON, new LDJSONCrawler())
        this.crawlers.set(CRAWLER_TYPE.META, new MetaCrawler())
        this.crawlers.set(CRAWLER_TYPE.PERFORMANCE, new PerformanceCrawler())
    }

    private static getFactory(): CrawlerFactory { 
        return CrawlerFactory.instance || new CrawlerFactory()
    }

    static get<T>(type: CRAWLER_TYPE): Crawler  {
        const crawlerFactory = CrawlerFactory.getFactory();
        if(crawlerFactory.crawlers.has(type)) {
            return crawlerFactory.crawlers.get(type) as Crawler
        }
        throw new Error(`Crawler doesn't exists with given type ${type}`)
    }
}
