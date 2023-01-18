export type NetworkInfoProps = {
    networkInfo: NetworkInfo
}

export type NetworkInfo = {
    statusCode: number,
    redirectStatus: number,
    url: string,
    redirectUrl: string,
    statusLine: string,
    redirectStatusLine: string,
}

export type NetworkItem = {
   statusCode: number,
   url: string,
   statusLine: string,
   type: 'redirect' | 'final'
}