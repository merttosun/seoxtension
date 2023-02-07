import { CHROME_MESSAGE } from '../constants'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Popup from './Popup'
import { PERFORMANCE_DATA } from 'crawler/performance-crawler'
import { META_DATA } from 'crawler/meta-crawler'
import { LINK_DATA } from 'crawler/anchor-crawler'
import { IMAGE_DATA } from '../crawler/image-crawler'

chrome.tabs &&
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // initial data
    let metaTags: META_DATA = {
      title: '',
      description: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      canonical: '',
      h1Tag: '',
      alternates: [],
    }

    let performanceMetrics: PERFORMANCE_DATA = {
      ttfb: 0,
      fcp: 0,
      domLoadTime: 0,
      windowLoadTime: 0,
    }

    let images: IMAGE_DATA = []

    let ldJson: string[]

    // to avoid sending message continually
    let performanceMetricsMeasured = false
    let metaTagsFetched = false
    let ldJsonsFetched = false
    let imagesFetched = false
    let anchorsCountFetched = false
    let redirectionResults: any = {}

    setInterval(async () => {
      const _redirectionResults = await chrome.storage.session.get('redirectionResults')
      console.log('index.tsx', _redirectionResults.redirectionResults)
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

            if (metaTags?.ogImage) {
              ;(document.getElementById('ogimage')! as HTMLImageElement).src = metaTags?.ogImage // after image viewer component implementation this should be removed
            }
          },
        )
      }

      // send message to trigger performance crawler for collecting performance metrics
      if (!performanceMetricsMeasured) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.PERFORMANCE },
          function (response: PERFORMANCE_DATA) {
            if (response.ttfb !== 0) {
              performanceMetricsMeasured = true
            }
            performanceMetrics = response
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

      // send message to trigger anchor-crawler for measuring anchor count
      if (!anchorsCountFetched) {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { msg: CHROME_MESSAGE.ANCHOR },
          function (response: LINK_DATA) {
            if (response?.length) {
              anchorsCountFetched = true
            }
            setAnchorCount(response)
          },
        )
      }

      // send message to ld crawler for collecting ld+json's from document
      if (!ldJsonsFetched) {
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

      ReactDOM.render(
        <Popup
          metaTags={metaTags}
          performanceMetrics={performanceMetrics}
          images={images}
          ldJson={ldJson}
          redirectionResults={redirectionResults}
        />,
        document.getElementById('popup'),
      )
    }, 300)
  })

function setAnchorCount(links: any) {
  if (links) {
    document.getElementById('anchor-count')!.innerText = String(links?.length)
  }
}

const SC_DESCRIPTION = new Map<number, string>([
  [200, 'STATUS OK'],
  [301, 'PERMANENTLY REDIRECT'],
  [302, 'FOUND'],
  [404, 'NOT FOUND'],
  [410, 'GONE'],
  [500, 'INTERNAL SERVER ERROR'],
])

let redirectionResults: Array<{
  statusCode: number
  url: string
  location: string
  description: string
}> = []

const filter = {
  url: [{ hostContains: '*' }],
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('onbrefore request', { details })
    if (details.type == 'main_frame') {
      chrome.storage.session.set({ redirectionResults: [] })
    }
  },
  {
    urls: ['<all_urls>'],
  },
)

chrome.webRequest.onBeforeRedirect.addListener(
  async (details) => {
    console.log(details.requestId, ':', details.url, '->', details)
    const redirectUrl = details.redirectUrl
    const statusCode = details.statusCode
    const result = await chrome.storage.session.get('lastRequestId')

    const lastRequestId = result['lastRequestId']
    console.log({ lastRequestId })

    if (lastRequestId && lastRequestId !== details.requestId) {
      // new path new redirection results
      redirectionResults = []
      redirectionResults.push({
        statusCode,
        url: details.url,
        location: redirectUrl,
        description: SC_DESCRIPTION.get(statusCode) || '',
      })
      await chrome.storage.session.set({ redirectionResults, lastRequestId: details.requestId })
    } else {
      redirectionResults.push({
        statusCode,
        url: details.url,
        location: redirectUrl,
        description: SC_DESCRIPTION.get(statusCode) || '',
      })

      await chrome.storage.session.set({ redirectionResults, lastRequestId: details.requestId })
    }
  },
  {
    urls: ['<all_urls>'],
  },
)

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    console.log('onRequestCompleted', details)
    const result = await chrome.storage.session.get('lastRequestId')
    const lastRequestId = result['lastRequestId']
    const { statusCode, type, requestId, url } = details

    if (
      type == 'main_frame' &&
      redirectionResults.length == 1 &&
      redirectionResults[0].location !== details.url &&
      SC_DESCRIPTION.get(statusCode)
    ) {
      redirectionResults = []
      redirectionResults.push({
        statusCode,
        url: details.url,
        location: '',
        description: SC_DESCRIPTION.get(statusCode) || '',
      })
      await chrome.storage.session.set({ redirectionResults, lastRequestId: details.requestId })
    } else if (type == 'main_frame' && SC_DESCRIPTION.get(statusCode)) {
      redirectionResults.push({
        statusCode,
        url: details.url,
        location: '',
        description: SC_DESCRIPTION.get(statusCode) || '',
      })
      await chrome.storage.session.set({ redirectionResults, lastRequestId: details.requestId })
    }
  },
  {
    urls: ['<all_urls>'],
  },
)

/*
chrome.webRequest.onHeadersRecevied.addListener(
  (details) => {
    console.log(Date.now(), { details })
    const isThereANewLocation = details.responseHeaders?.some(
      (header) => header.name === 'location',
    )
    const isItOnMainFrame = details.type === 'main_frame'

    const statusCode = details.statusCode
    const url = new URL(details.url)

    const locationPath = details.responseHeaders?.find(
      (header) => header.name === 'location',
    )?.value

    if (
      isItOnMainFrame &&
      redirectionResults.length < 1 &&
      isThereANewLocation &&
      statusCode !== 200
    ) {
      redirectionResults.push({
        statusCode,
        url: url.href,
        location: url.origin + locationPath,
        description: SC_DESCRIPTION.get(statusCode) || '',
      })
    } else if (
      isItOnMainFrame &&
      url.href === redirectionResults[redirectionResults.length - 1]?.location
    ) {
      redirectionResults.push({
        statusCode,
        url: url.href,
        location: url.origin + locationPath,
        description: SC_DESCRIPTION.get(statusCode) || '',
      })
    }

    chrome.storage.session.set({ redirectionResults: {} }).then(() => {
      console.log('Value is set to ' + redirectionResults)
    })

    chrome.storage.session.set({ redirectionResults }).then(() => {
      console.log('Value is set to ' + redirectionResults)
    })
    console.log({ locationPath })
    console.log({ details })
    console.log({ url })
    console.log({ redirectionResults })
  },
  {
    urls: ['<all_urls>'],
  },
  ['responseHeaders'],
)
*/

export { setAnchorCount }
