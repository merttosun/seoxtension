import { render } from '@testing-library/react'
import React from 'react'
import ImageViewer from '../../src/image-viewer/ImageViewer'
import '@testing-library/jest-dom'

describe('<ImageViewer />', () => {
  it('should render title and src correctly', () => {
    // act
    const props = {
      images: [
        'https://cdn.dsmcdn.com/web/production/icomoon-1671708390777.css',
        'https://cdn.dsmcdn.com/frontend/web/production/common-97ec81d433.style.css',
      ],
      title: 'Image',
    }
    const wrapper = render(<ImageViewer title={props.title} images={props.images} />)

    // expectations
    expect(wrapper.container.querySelector('.image-viewer'))?.toBeInTheDocument()
    expect(wrapper.container.querySelector('.image-container'))?.toBeInTheDocument()
    expect(wrapper.container.querySelector('.metric-list__title')?.innerHTML).toBe('Image')
    expect(wrapper.container.querySelectorAll('img')).toHaveLength(2)
  })

  it('should render fallback div correctly', () => {
    // act
    const wrapper = render(<ImageViewer title={''} images={[]} />)

    // expectations
    expect(wrapper.container.firstChild).toBeEmptyDOMElement()
  })
})
