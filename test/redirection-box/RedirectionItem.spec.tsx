import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RedirectionItem from '../../src/redirection-box/RedirectionItem'

describe('<RedirectionItem />', () => {
  it('should render redirection item correctly', () => {
    // act
    const redirectionItem = {
      url: 'https://example.com',
      statusCode: 301,
      location: 'https://example.com/new-location',
      description: 'redirected',
    }
    const wrapper = render(
      <RedirectionItem
        url={redirectionItem.url}
        statusCode={redirectionItem.statusCode}
        description={redirectionItem.description}
        lastItem={false}
      />,
    )

    // expectations
    expect(
      wrapper.queryByText(redirectionItem.statusCode + ':' + redirectionItem.description),
    ).toBeInTheDocument()

    expect(wrapper.queryByText('https://example.com')).toBeInTheDocument()
    expect(wrapper.queryByTestId('arrow-down-icon')).toBeInTheDocument()
  })

  it('should render Check icon when its last item', () => {
    // act
    const redirectionItem = {
      url: 'https://example.com',
      statusCode: 200,
      location: 'https://example.com/new-location',
      description: 'redirected',
    }
    const wrapper = render(
      <RedirectionItem
        url={redirectionItem.url}
        statusCode={redirectionItem.statusCode}
        description={redirectionItem.description}
        lastItem={true}
      />,
    )

    // expectations

    expect(wrapper.queryByTestId('check-icon')).toBeInTheDocument()
  })

  it('should render empty div when url or statuscode does not exist', () => {
    // act
    const redirectionItem = {
      url: '',
      statusCode: 0,
      location: 'https://example.com/new-location',
      description: 'redirected',
    }
    const wrapper = render(
      <RedirectionItem
        url={redirectionItem.url}
        statusCode={redirectionItem.statusCode}
        description={redirectionItem.description}
        lastItem={false}
      />,
    )

    // expectations
    expect(
      wrapper.queryByTestId(redirectionItem.url + redirectionItem.description),
    ).not.toBeInTheDocument()

    expect(wrapper.queryByTestId('empty-redirection-item')).toBeInTheDocument()
  })
})
