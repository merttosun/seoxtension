import {CRAWLER_TYPE} from "../constants";

export interface Crawler {
    type: CRAWLER_TYPE;
    collect(): any;
}
