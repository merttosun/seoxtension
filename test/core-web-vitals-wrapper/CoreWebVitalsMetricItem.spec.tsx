import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CoreWebVitalsMetricItem from '../../src/core-web-vitals-wrapper/core-web-vitals-metric-item/CoreWebVitalsMetricItem'
import { DEFAULT_CORE_WEB_VITALS_METRICS } from '../../src/utils/web-vitals-modifier'

describe('<CoreWebVitalsMetricItem />', () => {
  it('should render props correctly when metris is CLS', () => {
    // act
    const metric = DEFAULT_CORE_WEB_VITALS_METRICS['CLS']
    const wrapper = render(<CoreWebVitalsMetricItem {...metric} unit={''} name='CLS' />)

    // expectations
    expect(wrapper.container.querySelector('.metric-item__name_self')?.innerHTML).toBe('CLS')
    expect(wrapper.container.querySelector('.metric-item__name_status')?.innerHTML).toBe(': Good')
    expect(wrapper.container.querySelector('.threshold-bar-pointer-value')?.innerHTML).toBe('0.00 ')
  })

  it('should render props correctly with warning text and unit when metris is FID ', () => {
    // act
    const metric = DEFAULT_CORE_WEB_VITALS_METRICS['FID']
    const wrapper = render(<CoreWebVitalsMetricItem {...metric} unit={'ms'} name='FID' warningMessage='waiting for interaction'/>)

    // expectations
    expect(wrapper.container.querySelector('.metric-item__name_self')?.innerHTML).toBe('FID')
    expect(wrapper.container.querySelector('.metric-item__name_status')?.innerHTML).toBe(': waiting for interaction')
    expect(wrapper.container.querySelector('.threshold-bar-pointer-value')?.innerHTML).toBe('0.0 ms')
  })


  it('should render props correctly when metris is LCP', () => {
    // act
    const metric = DEFAULT_CORE_WEB_VITALS_METRICS['LCP']
    const wrapper = render(<CoreWebVitalsMetricItem {...metric} unit={'example lcp unit'} name='LCP' />)

    // expectations
    expect(wrapper.container.querySelector('.metric-item__name_self')?.innerHTML).toBe('LCP')
    expect(wrapper.container.querySelector('.metric-item__name_status')?.innerHTML).toBe(': Good')
    expect(wrapper.container.querySelector('.threshold-bar-pointer-value')?.innerHTML).toBe('0.0 example lcp unit')
  })
})
