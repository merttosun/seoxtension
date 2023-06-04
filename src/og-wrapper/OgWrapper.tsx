import React from 'react'
import ImageItem from '../image-viewer/image-item/imageItem'
import InfoBox from '../info-box/InfoBox'
import './OgWrapper.scss'

export type ImageItemProps = {
  title: string
  description: string
  image: string
}

export default function OgWrapper({ title, description, image }: ImageItemProps) {
  return (
    <div className='og-wrapper'>
      <div className='og-tags-image'>
        <span className='og-tags-image__title'>Image</span>
        <ImageItem source={image} />
      </div>
      <div className='og-tags-right'>
        <InfoBox title='Title' text={title} />
        <InfoBox title='Description' text={description} />
      </div>
    </div>
  )
}
