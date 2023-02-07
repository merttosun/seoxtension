import React from 'react'
import './RedirectionItem.scss'
import Copy from '../icon/Copy'
import ArrowDown from '../icon/ArrowDown'
import Check from '../icon/Check'

export type RedirectionItemProps = {
  url: string
  statusCode: number
  description: string
  lastItem: boolean
}

export default function RedirectionItem({
  url,
  statusCode,
  lastItem,
  description,
}: RedirectionItemProps) {
  if (url && statusCode) {
    return (
      <div className={lastItem ? 'redirection-item last-item' : 'redirection-item'}>
        <div
          className={
            lastItem
              ? 'redirection-item__icon-box last-item__icon-box'
              : 'redirection-item__icon-box'
          }
        >
          {lastItem ? <Check /> : <ArrowDown />}
        </div>
        <div className='redirection-item__infoes'>
          <div className='redirection-item__infoes__url'>{url}</div>
          <div className='redirection-item__infoes__status'>
            {`${statusCode}:${description}`}
          </div>
        </div>
        <Copy
          className='redirection-item__copy'
          onClick={() => {
            navigator.clipboard.writeText(url)
          }}
        />
      </div>
    )
  }
  return <div></div>
}
