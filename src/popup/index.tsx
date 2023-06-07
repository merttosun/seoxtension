/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CHROME_MESSAGE } from '../constants'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Popup from './Popup'
import { META_DATA } from 'crawler/meta-crawler'
import { IMAGE_DATA } from '../crawler/image-crawler'
import { CORE_WEB_VITALS_DATA, createInitialCoreWebVitalsData } from '../utils/web-vitals-modifier'

chrome.tabs &&
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const url = new URL(tabs[0].url!)

    // when the platform changes for the same URL, cookies might cause problems
    chrome.cookies.getAll({ url: url.href }, function (cookies) {
      for (let i = 0; i < cookies?.length; i++) {
        chrome.cookies.remove({ url: url.href, name: cookies[i].name })
      }
    })
    // initial data
    let metaTags: META_DATA = {
      title: '',
      description: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: [],
      canonical: '',
      h1Tag: '',
      alternates: [],
    }

    let coreWebVitalsMetrics: CORE_WEB_VITALS_DATA = createInitialCoreWebVitalsData()

    let images: IMAGE_DATA = []
    let ldJson: string[] = []

    // to avoid sending message continually
    let metaTagsFetched = false
    let ldJsonsFetched = false
    let imagesFetched = false

    let redirectionResults: any = {}

    setInterval(async () => {
      const _redirectionResults = await chrome.storage.session.get('redirectionResults')
      if (_redirectionResults) redirectionResults = _redirectionResults.redirectionResults

      // send message to trigger meta crawler for collecting meta tags from document

      if (!metaTagsFetched) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.META },
          function (response: META_DATA) {
            if (response?.title?.length > 0) {
              metaTagsFetched = true
            }
            metaTags = response
          },
        )
      }

      if (!imagesFetched) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.IMAGE },
          function (response: IMAGE_DATA) {
            if (response?.length > 0) {
              imagesFetched = true
            }
            images = response
          },
        )
      }

      // send message to ld crawler for collecting ld+json's from document
      if (!ldJsonsFetched || ldJson?.length < 1) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.LD_JSON },
          function (response: string[]) {
            if (response) {
              ldJsonsFetched = true
            }

            ldJson = response
          },
        )
      }

      // some core web vitals metrics (like fid) can not be fetched until first user interaction, we should not stop tracking them
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { msg: CHROME_MESSAGE.PERFORMANCE },
        function (response: { coreWebVitalsMetrics: CORE_WEB_VITALS_DATA }) {
          if (response) {
            coreWebVitalsMetrics = response?.coreWebVitalsMetrics
          }
        },
      )

      ReactDOM.render(
        <Popup
          metaTags={metaTags}
          coreWebVitalsMetrics={coreWebVitalsMetrics}
          images={images}
          ldJson={ldJson}
          redirectionResults={redirectionResults}
        />,
        document.getElementById('popup'),
      )
    }, 300)
  })
