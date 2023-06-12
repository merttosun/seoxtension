import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LinkWrapper from '../../src/link-wrapper/LinkWrapper'

Object.assign(navigator, {
  clipboard: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeText: () => {},
  },
})

describe('<LinkWrapper />', () => {
  let wrapper: any
  jest.spyOn(navigator.clipboard, 'writeText')
  const props = {
    link: 'https://www.trendyol.com/mudo-concept/mermer-dokulu-kavanoz-tea-900-cc-p-4224144',
    title: 'Canonical',
  }
  beforeEach(() => {
    wrapper = render(<LinkWrapper title={props.title} link={props.link} />)
  })
  afterEach(() => {
    wrapper = null
  })

  it('all props should render correctly', () => {
    // expectations
    expect(wrapper.container.querySelector('.link-wrapper__link').innerHTML).toBe(
      'https://www.trendyol.com/mudo-concept/mermer-dokulu-kavanoz-tea-900-cc-p-4224144',
    )
    expect(wrapper.container.querySelector('.link-wrapper__title').innerHTML).toBe('Canonical')
  })

  it('should click copy', () => {
    fireEvent.click(wrapper.container.querySelector('.link-wrapper__copy'))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://www.trendyol.com/mudo-concept/mermer-dokulu-kavanoz-tea-900-cc-p-4224144',
    )
  })
})
