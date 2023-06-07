import React, { useState } from 'react'
import './LdJson.scss'
import { JsonViewer } from '@textea/json-viewer'

export type LdJsonProps = {
  ldJson: string[]
}

export default function LdJsonWrapper({ ldJson }: LdJsonProps) {
  if (ldJson && ldJson.length > 0) {
    return (
      <div className='ld-json-wrapper'>
        <div className='ld-json-wrapper__content'>
          {ldJson.map((lj, i) => {
            const json = JSON.parse(lj)
            const type = json['@type']
            return (
              <div key={type} className='ld-json-wrapper__content__viewer'>
                <span className='ld-json-wrapper__content__type'>{type}</span>
                <JsonViewer
                  className='ld-json-wrapper__content__viewer__self'
                  displayDataTypes={false}
                  value={JSON.parse(lj)}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return <div className='fallback-text'>Could Not Find Ld+Json</div>
}
