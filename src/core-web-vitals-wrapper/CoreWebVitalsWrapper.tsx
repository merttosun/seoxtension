import React from 'react'
import './CoreWebVitalsWrapper.scss'
import CoreWebVitalsMetricItem from './core-web-vitals-metric-item/CoreWebVitalsMetricItem'
import {
  CORE_WEB_VITALS_DATA,
  LCP_SHORT_NAME,
  FID_SHORT_NAME,
  CLS_SHORT_NAME,
} from '../utils/web-vitals-modifier'

export type CoreWebVitalsWrapperProps = {
  metrics: CORE_WEB_VITALS_DATA
}

export default function CoreWebVitalsWrapper({ metrics }: CoreWebVitalsWrapperProps) {
  if (metrics && Array.isArray(Object.keys(metrics))) {
    return (
      <>
        <CoreWebVitalsMetricItem
          name={LCP_SHORT_NAME}
          value={metrics[LCP_SHORT_NAME]?.value}
          key={LCP_SHORT_NAME}
          thresholds={metrics[LCP_SHORT_NAME]?.thresholds}
          unit='s'
          status={metrics[LCP_SHORT_NAME]?.status}
        />
        <CoreWebVitalsMetricItem
          name={FID_SHORT_NAME}
          value={metrics[FID_SHORT_NAME]?.value}
          key={FID_SHORT_NAME}
          thresholds={metrics[FID_SHORT_NAME]?.thresholds}
          unit='ms'
          status={metrics[FID_SHORT_NAME]?.status}
          warningMessage={'Waiting for interaction'}
        />
        <CoreWebVitalsMetricItem
          name={CLS_SHORT_NAME}
          value={metrics[CLS_SHORT_NAME]?.value}
          key={CLS_SHORT_NAME}
          thresholds={metrics[CLS_SHORT_NAME]?.thresholds}
          unit=''
          status={metrics[CLS_SHORT_NAME]?.status}
        />
      </>
    )
  }
  return <div></div>
}
