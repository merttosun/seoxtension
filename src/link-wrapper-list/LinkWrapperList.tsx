import React from 'react'
import './LinkWrapperList.scss'
import Copy from '../icon/Copy'

export type LinkWrapperListProps = {
  links: { link: string; info?: string }[]
  title: string
}

export default function LinkWrapperList({ title, links }: LinkWrapperListProps) {
  if (Array.isArray(links) && links?.length > 0) {
    return (
      <div className='link-wrapper-list'>
        {links.map((value, index) => (
          <div key={index} className='link-wrapper-list__content'>
            <div className='link-wrapper-list__info'>{value.info ? `${value.info} |` : ' '}</div>
            <span className='link-wrapper-list__link'>{value.link}</span>
            <Copy
              color='white'
              className='link-wrapper-list__copy'
              onClick={() => {
                navigator.clipboard.writeText(value.link)
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  return <div className='fallback-text'>Could not find for this page</div>
}
