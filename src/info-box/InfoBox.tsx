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
      {text ? (
        <p className='info-box__text'>{text}</p>
      ) : (
        <p className='info-box__fallback-text'>Could not find for this page</p>
      )}
    </div>
  )
}
