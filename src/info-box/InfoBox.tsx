import React from 'react'
import './InfoBox.scss'

export type InfoBoxProps = {
  title: string
  text: string
}

export default function InfoBox({ title, text }: InfoBoxProps) {
  return (
    <div className='info-box'>
      <span className='info-box__title'>{title}</span>
      <p className='info-box__text'>{text != '' ? text : title + ' does not exist on this page'}</p>
    </div>
  )
}
