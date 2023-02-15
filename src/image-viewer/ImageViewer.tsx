import React from 'react'
import './ImageViewer.scss'
import ImageItem from './image-item/imageItem'

export type ImageViewerProps = {
  title: string
  images: string[]
}

export default function ImageViewer({ title, images }: ImageViewerProps) {
  if (images && images.length > 0) {
    const imageItems = images.map((url: string, index) => <ImageItem key={index} source={url} />)

    return (
      <div className='image-list'>
        <span className='metric-list__title'>{title}</span>
        <div className='image-viewer'>
          <div className='image-container'>{imageItems}</div>
        </div>
      </div>
    )
  }
  return <div></div>
}
