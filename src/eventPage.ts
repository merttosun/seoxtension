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
    const { statusCode, type, requestId } = details

    if (
      type == 'main_frame' &&
      statusCode == 200 &&
      redirectionResults.length &&
      lastRequestId == requestId &&
      redirectionResults[redirectionResults.length - 1].location === details.url
    ) {
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
