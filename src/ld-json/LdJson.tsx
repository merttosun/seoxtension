import React from 'react'
import './LdJson.scss'
const { SchemaViewer } = require('material-ui-json-schema-viewer')

export type LdJsonProps = {
  title: string
  ldJson: string[]
}

export default function LdJsonWrapper({ title, ldJson }: LdJsonProps) {
  if (ldJson && ldJson.length > 0) {
    const jsonItem = ldJson.map((json: string, index) => <SchemaViewer key={index} schema={JSON.parse(json)} />)
    return (
      <div className='ld-json-wrapper'>
        <span className='ld-json-wrapper__title'>{title}</span>
        <div className='ld-json-wrapper__content'>{jsonItem}</div>
      </div>
    )
  }
  return <div className='ld-json__fallback-text'>Could Not Find Ld+Json</div>
}
