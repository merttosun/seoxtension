
;(function () {
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

  chrome.webRequest.onBeforeRedirect.addListener(
    async (details) => {
      const redirectUrl = details.redirectUrl
      const statusCode = details.statusCode
      const result = await chrome.storage.session.get('lastRequestId')

      const lastRequestId = result['lastRequestId']

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
      types: ['main_frame'],
    },
  )

  chrome.webRequest.onBeforeRequest.addListener(
    () => {
      chrome.storage.session.get('lastRequestId').then((result) => {
        const lastRequestId = result['lastRequestId']
        if (!lastRequestId) {
          chrome.storage.session.set({ redirectionResults: [] }).then(() => {
            return
          })
        }
      })
    },
    {
      urls: ['<all_urls>'],
      types: ['main_frame'],
    },
  )

  chrome.webRequest.onCompleted.addListener(
    async (details) => {
      const result = await chrome.storage.session.get('lastRequestId')
      const lastRequestId = result['lastRequestId']
      const { statusCode, type, requestId, url } = details

      if (!url.startsWith('http')) {
        // to exclude urls like chrome-extension://123-456
        return
      }

      if (
        !lastRequestId ||
        (lastRequestId && lastRequestId !== requestId && type == 'main_frame')
      ) {
        // new path new redirection results
        redirectionResults = []
        redirectionResults.push({
          statusCode,
          url: details.url,
          location: '',
          description: SC_DESCRIPTION.get(statusCode) || '',
        })
        await chrome.storage.session.set({ redirectionResults, lastRequestId: details.requestId })
      }

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
      types: ['main_frame'],
    },
  )
})()
