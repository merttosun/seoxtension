import React from 'react'
import './RedirectionBox.scss'
import RedirectionItem from './RedirectionItem'

export type MetricListProps = {
  redirectionResults: { url: string; statusCode: number; location: string; description: string }[]
}

export default function RedirectionBox({ redirectionResults }: MetricListProps) {
  if (Array.isArray(redirectionResults) && redirectionResults.length > 0) {
    const redirectionItems = redirectionResults?.map((redirectionItem, index) => {
      return (
        <RedirectionItem
          url={redirectionItem.url}
          statusCode={redirectionItem.statusCode}
          key={redirectionItem.url}
          description={redirectionItem.description}
          lastItem={index === redirectionResults.length - 1}
        />
      )
    })

    return (
      <div className='redirection-box'>
        <div className='redirection-box__title'>Redirect Path</div>
        <div className='redirection-box__items'>{redirectionItems}</div>
      </div>
    )
  }

  return <div></div>
}
