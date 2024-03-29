import React from 'react'
import './LinkWrapper.scss'
import Copy from '../icon/Copy'

export type LinkProp = {
  link: string
  title: string
}
export default function LinkWrapper({ title, link }: LinkProp) {
  return (
    <div className='link-wrapper'>
      <span className='link-wrapper__title'>{title}</span>
      {link ? (
        <div className='link-wrapper__content'>
          <>
            <span className='link-wrapper__link'>{link}</span>
            <Copy
              className='link-wrapper__copy'
              color='white'
              onClick={() => {
                navigator.clipboard.writeText(link)
              }}
            />
          </>
        </div>
      ) : (
        <p className='link-wrapper__fallback-text'>Could not find for this page</p>
      )}
    </div>
  )
}
