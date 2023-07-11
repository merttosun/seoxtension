import React, { useEffect, useState } from 'react'
import './CoreWebVitalsMetricItem.scss'

import { Status } from '../../utils/web-vitals-modifier'

export type CoreWebVitalsMetricItemProps = {
  name: string
  value: number
  thresholds: {
    good: { start: number; end: number; range: number }
    needImprovement: { start: number; end: number; range: number }
    bad: { start: number; end: number; range: number }
  }
  unit: string
  status: Status
  warningMessage?: string
}

const readeableStatusTexts = new Map<string, string>([
  ['good', 'Good'],
  ['needImprovement', 'Need improvement!'],
  ['bad', 'Bad!'],
])

export default function CoreWebVitalsMetricItem({
  name,
  status,
  value,
  unit,
  thresholds,
  warningMessage,
}: CoreWebVitalsMetricItemProps) {
  const [pointerPosition, setPointerPosition] = useState({
    left: '10%',
  })

  useEffect(() => {
    const percentageFromStatusStart =
      100 * ((value - thresholds[status].start) / thresholds[status].range)

    if (status === 'good') {
      setPointerPosition({
        left: Number(percentageFromStatusStart / 3) - 7.8 + '%',
      })
    }

    if (status === 'needImprovement') {
      setPointerPosition({ left: Number(25 + percentageFromStatusStart / 3) + '%' })
    }

    if (status === 'bad') {
      setPointerPosition({
        left: Math.min(Number(58.1 + percentageFromStatusStart / 3), 92.5) + '%',
      })
    }
  }, [status, value, thresholds])

  return (
    <div className='metric-item'>
      <div className='metric-item__name'>
        <span className='metric-item__name_self'>{name}</span>
        <span className='metric-item__name_status'>
          : {!value && warningMessage ? warningMessage : readeableStatusTexts.get(status)}
        </span>
      </div>
      <div className='threshold-bar-wrapper'>
        <div className='threshold-bar-pointer' style={{ ...pointerPosition }}>
          <div className={`threshold-bar-pointer-stick ${status}`}>{'|'}</div>
          <div className={`threshold-bar-pointer-value ${status}`}>
            {value.toFixed(name === 'CLS' ? 2 : 1) + ' ' + unit}
          </div>
        </div>
        <div className='threshold-bar-self'>
          <div className='threshold-bar-self-good'>
            <div className='threshold-bar-self-good-limit'>{thresholds.good.end + ' ' + unit}</div>
          </div>
          <div className='threshold-bar-self-need-improvement'>
            <div className='threshold-bar-self-need-improvement-limit'>
              {thresholds.needImprovement.end + ' ' + unit}
            </div>
          </div>
          <div className='threshold-bar-self-bad'></div>
        </div>
      </div>
    </div>
  )
}
