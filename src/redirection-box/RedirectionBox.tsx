import React from 'react'
import './RedirectionBox.scss'
import RedirectionItem from './redirection-item/RedirectionItem'

export type MetricListProps = {
  redirectionResults: { url: string; statusCode: number; location: string; description: string }[]
}

export default function RedirectionBox({ redirectionResults }: MetricListProps) {
  if (Array.isArray(redirectionResults) && redirectionResults.length > 0) {
    const redirectionItems = redirectionResults?.map((redirectionItem, index) => {
      const { url, statusCode, description } = redirectionItem
      return (
        <RedirectionItem
          url={url}
          statusCode={statusCode}
          key={url}
          description={description}
          lastItem={index === redirectionResults.length - 1}
        />
      )
    })

    return (
      <div className='redirection-box'>
        <span className='redirection-box__title'>Redirect Path</span>
        <div className='redirection-box__items'>{redirectionItems}</div>
      </div>
    )
  }

  return <div></div>
}
