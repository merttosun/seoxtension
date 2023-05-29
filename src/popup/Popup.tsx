import Divider from '../divider/Divider'
import React, { useEffect, useState } from 'react'
import InfoBox from '../info-box/InfoBox'
import MetricList from '../metric-list/MetricList'
import RedirectionBox from '../redirection-box/RedirectionBox'
import { PERFORMANCE_DATA } from 'crawler/performance-crawler'
import { MetricItemProps } from 'metric-list/metric-item/MetricItem'
import LdJsonWrapper from '../ld-json/LdJson'
import { META_DATA } from 'crawler/meta-crawler'
import LinkWrapper from '../link-wrapper/LinkWrapper'
import ImageItem from '../image-viewer/image-item/imageItem'
import { IMAGE_DATA } from '../crawler/image-crawler'
import LinkWrapperList from '../link-wrapper-list/LinkWrapperList'
import './Popup.scss'

type PopupProps = {
  metaTags: META_DATA
  performanceMetrics: PERFORMANCE_DATA
  ldJson: string[]
  images: IMAGE_DATA
  redirectionResults: any
}
export default function Popup({
  metaTags,
  performanceMetrics,
  ldJson,
  redirectionResults,
}: PopupProps) {
  const [perfMetrics, setPerfMetrics] = useState([{}])

  useEffect(() => {
    setPerfMetrics(mapPerformanceMetrics(performanceMetrics))
  }, [performanceMetrics])

  const mapPerformanceMetrics = (performanceMetrics: any): MetricItemProps[] => {
    // to prepare readeable name of every metric and pass those to the metric list comp,

    const metricNameValuePairs: Array<Array<string | number>> = Object.entries(performanceMetrics)

    const metrics: MetricItemProps[] = []

    for (const [name, value] of metricNameValuePairs) {
      metrics.push({ name: name as string, value })
    }

    return metrics
  }

  return (
    <div className='popup-wrapper'>
      <div className='popup-wrapper__heading'>
        {/* <img src='./seo-64-new.png' width='64' height='64'></img> */}
        {/* <img src='./seo-128.png' width='128' height='128'></img>
        <img src='./seo-128.png' width='100' height='100'></img> */}
        <span className='extension-title-rest'>SEO</span>
        <span className='extension-title-x'>X</span>
        <span className='extension-title-rest'>TENSION</span>
      </div>
      <RedirectionBox redirectionResults={redirectionResults}></RedirectionBox>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Meta Tags</span>
        <InfoBox title='Title' text={metaTags?.title} />
        <InfoBox title='Description' text={metaTags?.description} />
        {metaTags?.canonical && <LinkWrapper title='Canonical' link={metaTags?.canonical} />}
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>H1</span>
        <InfoBox title='' text={metaTags?.h1Tag} />
      </section>
      <section className='section-wrapper og-wrapper'>
        <span className='section-wrapper__title'>OG Tags</span>
        <div className='og-tags-left'>
          <span className='og-tags-left__title'>Image</span>
          <ImageItem source={metaTags?.ogImage[0]} />
        </div>
        <div className='og-tags-right'>
          <InfoBox title='Title' text={metaTags?.ogTitle} />
          <InfoBox title='Description' text={metaTags?.ogDescription} />
        </div>
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Alternate Hreflangs</span>
        <LinkWrapperList links={metaTags?.alternates} title='' />
      </section>
      <Divider />
      <MetricList title='Performance Metrics' metrics={perfMetrics} />
      <LdJsonWrapper title='Ld Json' ldJson={ldJson} />
    </div>
  )
}
