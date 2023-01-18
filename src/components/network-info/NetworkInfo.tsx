import React from 'react';
import {NetworkInfoProps} from './types';
import NetworkItem from './network-item/NetworkItem';
import './NetworkInfo.scss'



export default function NetworkInfo({networkInfo: {redirectStatus, redirectStatusLine, statusLine, statusCode, redirectUrl, url}} : NetworkInfoProps) {

    return <div className="network-info__container">
        <h1 className="network-info__heading">Redirect Path</h1>
            <NetworkItem statusCode={redirectStatus} url={redirectUrl} statusLine={redirectStatusLine} type="redirect" />
            <NetworkItem statusCode={statusCode} url={url} statusLine={statusLine} type="final" />
    </div>
}