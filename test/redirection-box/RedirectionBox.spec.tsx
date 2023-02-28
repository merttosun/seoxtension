import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RedirectionBox from '../../src/redirection-box/RedirectionBox'

describe('<RedirectionBox />', () => {
  it('should render redirection results with status codes correctly', () => {
    // act
    const redirectionResults = [
      {
        url: 'https://example.com',
        statusCode: 301,
        location: 'https://example.com/new-location',
        description: 'redirected',
      },
      {
        url: 'https://example.com/new-location',
        statusCode: 200,
        location: '',
        description: 'status ok',
      },
    ]
    const wrapper = render(<RedirectionBox redirectionResults={redirectionResults} />)

    // expectations
    expect(wrapper.queryByText('Redirect Path')).toBeInTheDocument()
    expect(wrapper.queryByText('https://example.com')).toBeInTheDocument()
    expect(wrapper.queryByText('https://example.com/new-location')).toBeInTheDocument()
  })

  it('should return empty div when redirection results does not have length', () => {
    // act
    const redirectionResults = [] as {
      url: string
      statusCode: number
      location: string
      description: string
    }[]
    const wrapper = render(<RedirectionBox redirectionResults={redirectionResults} />)

    // expectations
    expect(wrapper.queryByText('Redirect Path')).not.toBeInTheDocument()
  })
})
