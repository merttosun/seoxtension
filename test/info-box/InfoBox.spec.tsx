import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import InfoBox from '../../src/info-box/InfoBox'

describe('<InfoBox />', () => {
  it('should render text and title correctly', () => {
    // act
    const wrapper = render(<InfoBox text='sfm' title='extension' />)

    // expectations
    expect(wrapper.queryByText('sfm')).toBeInTheDocument()
    expect(wrapper.queryByText('extension')).toBeInTheDocument()
  })
})
