import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import OgWrapper from '../../src/og-wrapper/OgWrapper'

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
})

describe('<OgWrapper />', () => {
  const props = {
    title: 'Sample Og Title',
    description: 'Sample Og Description',
    image: 'https://sample-og-image.com',
  }

  const wrapper = render(<OgWrapper {...props} />)

  it('should render title desc and image correctly', () => {
    expect(wrapper.queryByText('Image')).toBeInTheDocument()
    expect(wrapper.queryByText('Title')).toBeInTheDocument()
    expect(wrapper.queryByText('Description')).toBeInTheDocument()
    expect(wrapper.queryByText('Sample Og Title')).toBeInTheDocument()
    expect(wrapper.queryByText('Sample Og Description')).toBeInTheDocument()
    expect(wrapper.container.querySelector('.image-card')).toBeInTheDocument()
    expect(wrapper.container.querySelector('img')).toHaveAttribute('src', props.image)
  })
})
