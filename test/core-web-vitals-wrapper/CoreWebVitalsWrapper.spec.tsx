import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CoreWebVitalsWrapper from '../../src/core-web-vitals-wrapper/CoreWebVitalsWrapper'
import { DEFAULT_CORE_WEB_VITALS_METRICS } from '../../src/utils/web-vitals-modifier'

describe('<CoreWebVitalsWrapper />', () => {
  it('should render metric items correctly', () => {
    // act
    const metrics = DEFAULT_CORE_WEB_VITALS_METRICS
    const wrapper = render(<CoreWebVitalsWrapper metrics={metrics} />)
    // expectations
    expect(wrapper.queryByText('FID')).toBeInTheDocument()
    expect(wrapper.queryByText('CLS')).toBeInTheDocument()
    expect(wrapper.queryByText('LCP')).toBeInTheDocument()
  })
})
