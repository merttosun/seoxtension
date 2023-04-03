import React, {useState} from 'react'
import './LdJson.scss'
import { JsonViewer } from '@textea/json-viewer';
import ArrowLeft from '../icon/ArrowLeft';
import ArrowRight from '../icon/ArrowRight';

export type LdJsonProps = {
  title: string
  ldJson: string[]
}

export default function LdJsonWrapper({ title, ldJson }: LdJsonProps) {
  const [ldJsonIndex, setLdJsonIndex] = useState<number>(0)
  if (ldJson && ldJson.length > 0) {
    return (
      <div className='ld-json-wrapper'>
        <span className='ld-json-wrapper__title'>{title}</span>
        <div className='ld-json-wrapper__content'>
            <div className="ld-json-wrapper__content__navigation">
                {ldJsonIndex > 0 &&  <ArrowLeft onClick={() => setLdJsonIndex(ldJsonIndex-1)} />}
                {ldJsonIndex !== (ldJson.length - 1) && <ArrowRight onClick={() => setLdJsonIndex(ldJsonIndex+1)} />}
            </div>
          <JsonViewer displayDataTypes={false} value={JSON.parse(ldJson[ldJsonIndex])} />
        </div>
      </div>
    )
  }
  return <div className='ld-json__fallback-text'>Could Not Find Ld+Json</div>
}
