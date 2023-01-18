import React from 'react';
import { NetworkItem } from '../types';
import './NetworkItem.scss';
import RedirectIcon from '../../../icon/RedirectIcon';
import SuccessIcon from '../../../icon/SuccessIcon';
import Copy from '../../../icon/Copy';

export default function NetworkItem(props: NetworkItem ) {


    return (
        <div className={`network-item__container network-item__container--${props.type}`}>
            <div className="network-item__icon">
                {props.type  === 'redirect' ? <RedirectIcon /> : <SuccessIcon />}
            </div>
            <div className="network-item__text">
            <span className="network-item__url">{props.url}</span>
            <div className="network-item__status">
            <span className="network-item__status-code">{props.statusCode}:</span>
            <span className="network-item__status-line">{props.statusLine}</span>
            </div>
            </div>
            <Copy className="network-item__copy" onClick={() => navigator.clipboard.writeText(props.url)} />
        </div>
    )
}