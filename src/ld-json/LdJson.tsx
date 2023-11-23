import React from 'react'
import './LdJson.scss'
import { JsonViewer } from '@textea/json-viewer'

export type LdJsonProps = {
  ldJson: string[]
}

export default function LdJsonWrapper({ ldJson }: LdJsonProps) {
  if (Array.isArray(ldJson) && ldJson.length > 0) {
    return (
      <div className='ld-json-wrapper'>
        <div className='ld-json-wrapper__content'>
          {ldJson.map((lj) => {
            let json: any
            let type = ''
            try {
              json = JSON.parse(lj)
              type = json['@type']
            } catch (e) {
              console.log(e, lj)
            }

            return (
              <div key={type} className='ld-json-wrapper__content__viewer'>
                <span className='ld-json-wrapper__content__type'>{type}</span>
                {json ? (
                  <JsonViewer
                    className='ld-json-wrapper__content__viewer__self'
                    displayDataTypes={false}
                    value={json}
                  />
                ) : (
                  <div className='fallback-text invalid'>There is an invalid json, Could not parse it</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return <div className='fallback-text'>Could not find for this page</div>
}
