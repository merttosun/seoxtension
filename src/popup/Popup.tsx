import Divider from '../divider/Divider'
import React, { useEffect, useState } from 'react'
import InfoBox from '../info-box/InfoBox'
import MetricList from '../metric-list/MetricList'
import { PERFORMANCE_DATA } from 'crawler/performance-crawler'
import { MetricItemProps } from 'metric-list/metric-item/MetricItem'
import LdJsonWrapper from '../ld-json/LdJson'
import { META_DATA } from 'crawler/meta-crawler'
import LinkWrapper from '../link-wrapper/LinkWrapper'
import ImageViewer from '../image-viewer/ImageViewer'
import { IMAGE_DATA } from '../crawler/image-crawler'
import LinkWrapperList from '../link-wrapper-list/LinkWrapperList';

type PopupProps = {
  metaTags: META_DATA
  performanceMetrics: PERFORMANCE_DATA
  ldJson: string[]
  images: IMAGE_DATA
}

const PERFORMANCE_METRICS = new Map<string, string>([
  ['ttfb', 'TTFB'],
  ['fcp', 'FCP'],
  ['domLoadTime', 'Dom Load Time'],
  ['windowLoadTime', 'Window Load Time'],
])

export default function Popup({ metaTags, performanceMetrics, images, ldJson }: PopupProps) {
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
      <Divider />
      <InfoBox title='Meta Title' text={metaTags?.title} />
      <InfoBox title='Meta Description' text={metaTags?.description} />
      <InfoBox title='H1 Tag' text={metaTags?.h1Tag} />
      <InfoBox title='OG Title' text={metaTags?.ogTitle} />
      <InfoBox title='OG Description' text={metaTags?.ogDescription} />
        <ImageViewer title='OG Image' images={metaTags?.ogImage} />
      <LinkWrapper title='Canonical' link={metaTags?.canonical} />
      <LinkWrapperList links={metaTags?.alternates} title='Alternates' />
      <Divider />
      <MetricList title='Performance Metrics' metrics={perfMetrics} />
      <LdJsonWrapper title='Ld Json' ldJson={ldJson} />
    </div>
  )
}
