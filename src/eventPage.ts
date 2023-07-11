export type REDIRECTIONS_DATA = {
  url: string
  statusCode: number
  location: string
  description: string
}[]

function fetchRedirectionStatus() {
  const SC_DESCRIPTION = new Map<number, string>([
    [200, 'STATUS OK'],
    [301, 'PERMANENTLY REDIRECT'],
    [302, 'FOUND'],
    [403, 'FORBIDDEN'],
    [404, 'NOT FOUND'],
    [410, 'GONE'],
    [500, 'INTERNAL SERVER ERROR'],
  ])

  let redirectionResults: REDIRECTIONS_DATA = []

  chrome.webRequest.onBeforeRedirect.addListener(
    async (details) => {

      const { tabId, statusCode, url, redirectUrl, requestId } = details
      const redirectionResult = {
        statusCode: statusCode,
        url: url,
        location: redirectUrl,
        description: SC_DESCRIPTION.get(statusCode) || '',
      }
      const result = await chrome.storage.session.get('lastRequestId')
      const lastRequestId = result['lastRequestId']

      if (lastRequestId && lastRequestId !== requestId) {
        // new path new redirection results
        redirectionResults = [redirectionResult]
      } else {
        redirectionResults.push(redirectionResult)
      }

      const key = `${tabId}_redirectionResults`
      await chrome.storage.session.set({
        [key]: redirectionResults,
        lastRequestId: requestId,
      })
    },
    {
      urls: ['<all_urls>'],
      types: ['main_frame'],
    },
  )

  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      ;async () => {
        const { tabId } = details
        await chrome.storage.session.get('lastRequestId').then((result) => {
          const lastRequestId = result['lastRequestId']
          if (!lastRequestId) {
            const key = `${tabId}_redirectionResults`
            chrome.storage.session.set({ [key]: [] })
          }
        })
      }
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
      const { tabId, statusCode, type, requestId, url } = details
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
        await chrome.storage.session.set({
          redirectionResults,
          lastRequestId: details.requestId,
        })
      }

      const key = `${tabId}_redirectionResults`

      if (
        type == 'main_frame' &&
        redirectionResults?.length == 1 &&
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

        await chrome.storage.session.set({
          [key]: redirectionResults,
          lastRequestId: details.requestId,
        })
      } else if (type == 'main_frame' && SC_DESCRIPTION.get(statusCode)) {
        redirectionResults.push({
          statusCode,
          url: details.url,
          location: '',
          description: SC_DESCRIPTION.get(statusCode) || '',
        })

        await chrome.storage.session.set({
          [key]: redirectionResults,
          lastRequestId: details.requestId,
        })
      }
    },
    {
      urls: ['<all_urls>'],
      types: ['main_frame'],
    },
  )
}

fetchRedirectionStatus()
