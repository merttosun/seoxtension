import React, { useState, useEffect } from 'react'
import InfoBox from '../info-box/InfoBox'
import MetricList from '../core-web-vitals-wrapper/CoreWebVitalsWrapper'
import RedirectionBox from '../redirection-box/RedirectionBox'
import { CORE_WEB_VITALS_DATA, createInitialCoreWebVitalsData } from '../utils/web-vitals-modifier'
import LdJsonWrapper from '../ld-json/LdJson'
import { META_DATA } from 'crawler/meta-crawler'
import LinkWrapper from '../link-wrapper/LinkWrapper'
import LinkWrapperList from '../link-wrapper-list/LinkWrapperList'
import './Popup.scss'
import OgWrapper from '../og-wrapper/OgWrapper'
import { REDIRECTIONS_DATA } from '../../src/eventPage'
import { CHROME_MESSAGE } from '../constants'

export default function Popup() {
  const [metaTags, setMetaTags] = useState<META_DATA>({
    title: '',
    description: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: [],
    canonical: '',
    h1Tag: '',
    alternates: [],
  })

  const [ldJson, setLdJson] = useState<string[]>([])

  const [coreWebVitalsMetrics, setCoreWebVitalsMetrics] = useState<CORE_WEB_VITALS_DATA>(
    createInitialCoreWebVitalsData(),
  )

  const [redirectionResults, setRedirectionResults] = useState<REDIRECTIONS_DATA>([])

  useEffect(() => {
    if (chrome.runtime.lastError) {
      chrome.runtime.restart()
    }

    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId: number = tabs[0].id as number

        const url = new URL(tabs[0].url as string)

        // when the platform changes for the same URL, cookies might cause problems
        chrome.cookies.getAll({ url: url?.href }, function (cookies) {
          for (let i = 0; i < cookies?.length; i++) {
            chrome.cookies.remove({ url: url?.href, name: cookies[i].name })
          }
        })

        const storageKey = `${tabId}_redirectionResults`

        const getRedirectionResults = async () => {
          const storageResult = await chrome.storage.session.get(storageKey)
          if (storageResult[storageKey]) {
            setRedirectionResults(storageResult[storageKey])
          }
        }

        setInterval(() => {
          chrome.tabs.sendMessage(tabId, { msg: CHROME_MESSAGE.META }, (response) => {
            if (response?.title) {
              setMetaTags(response)
            }
          })

          chrome.tabs.sendMessage(tabId, { msg: CHROME_MESSAGE.LD_JSON }, (response: string[]) => {
            if (Array.isArray(response) && response.length) {
              setLdJson(response)
            }
          })
          chrome.tabs.sendMessage(
            tabId,
            { msg: CHROME_MESSAGE.PERFORMANCE },
            (response: { coreWebVitalsMetrics: CORE_WEB_VITALS_DATA }) => {
              if (response) {
                setCoreWebVitalsMetrics(response?.coreWebVitalsMetrics)
              }
            },
          )
          getRedirectionResults()
        }, 500)
      })
  }, [])

  return (
    <div className='popup-wrapper'>
      <div className='popup-wrapper__heading'>
        <img src='images/logo.png'></img>
      </div>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Navigation Flow</span>
        <RedirectionBox redirectionResults={redirectionResults}></RedirectionBox>
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Main Meta Tags</span>
        <InfoBox title='Title' text={metaTags?.title} />
        <InfoBox title='Description' text={metaTags?.description} />
        <LinkWrapper title='Canonical' link={metaTags?.canonical} />
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>H1</span>
        <InfoBox title='' text={metaTags?.h1Tag} />
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Alternate Hreflangs</span>
        <LinkWrapperList links={metaTags?.alternates} />
      </section>
      <section className='section-wrapper og-wrapper'>
        <span className='section-wrapper__title'>OG Tags</span>
        <OgWrapper
          title={metaTags?.ogTitle}
          description={metaTags?.ogDescription}
          image={metaTags?.ogImage[0]}
        ></OgWrapper>
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Core Web Vitals</span>
        <MetricList metrics={coreWebVitalsMetrics} />
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>LDJsons</span>
        <LdJsonWrapper ldJson={ldJson} />
      </section>
    </div>
  )
}
