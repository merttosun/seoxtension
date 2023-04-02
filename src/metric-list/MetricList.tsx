import React from 'react'
import './MetricList.scss'
import MetricItem, { MetricItemProps } from './metric-item/MetricItem'

export type MetricListProps = {
  title: string
  metrics?: MetricItemProps[]
}

export default function MetricList({ title, metrics }: MetricListProps) {
  if (metrics && Object.keys(metrics).length > 0) {
    const metricItems = metrics.map((metric: MetricItemProps, index) => {
      return <MetricItem name={metric.name} value={metric.value} key={`${metric.name}-${index}`} />
    })

    return (
      <div className='metric-list'>
        <span className='metric-list__title'>{title}</span>
        <div className='metric-list__items'>{metricItems}</div>
      </div>
    )
  }

  return <div className='metric-list__fallback-text'>Could Not Measure {title} Correctly</div>
}
