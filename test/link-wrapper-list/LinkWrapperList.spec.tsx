import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import LinkWrapperList, { LinkWrapperListProps } from '../../src/link-wrapper-list/LinkWrapperList'

Object.assign(navigator, {
  clipboard: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeText: () => {},
  },
})

describe('<LinkWrapperList />', () => {
  jest.spyOn(navigator.clipboard, 'writeText')

  const props: LinkWrapperListProps = {
    links: [
      {
        link: 'https://www.trendyol.com/mudo-concept/mermer-dokulu-kavanoz-tea-900-cc-p-4224144',
      },
      {
        link: 'https://www.trendyol.com/elbise-x-c56',
        info: 'TR',
      },
    ],
  }

  let wrapper: RenderResult

  beforeEach(() => {
    wrapper = render(<LinkWrapperList links={props.links} />) as RenderResult
  })

  it('all props should render correctly', () => {
    expect(wrapper.container.querySelectorAll('.link-wrapper-list__link')[0].innerHTML).toBe(
      'https://www.trendyol.com/mudo-concept/mermer-dokulu-kavanoz-tea-900-cc-p-4224144',
    )
    expect(wrapper.container.querySelectorAll('.link-wrapper-list__info')[0].innerHTML).toBe(' ')
    expect(wrapper.container.querySelectorAll('.link-wrapper-list__link')[1].innerHTML).toBe(
      'https://www.trendyol.com/elbise-x-c56',
    )
    expect(wrapper.container.querySelectorAll('.link-wrapper-list__info')[1].innerHTML).toBe('TR |')
  })

  it('should click copy', () => {
    const copyElement = wrapper.container.querySelector('.link-wrapper-list__copy')

    if (copyElement != null) {
      fireEvent.click(copyElement)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'https://www.trendyol.com/mudo-concept/mermer-dokulu-kavanoz-tea-900-cc-p-4224144',
      )
    } else {
      throw Error('Element not found.')
    }
  })
})
